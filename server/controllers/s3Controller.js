const AppError = require('../util/AppError');
const { catchAsync } = require('../util/catchAsync');

const redis = require('redis');

// Replace config.redisURI with your actual Redis URI or connection details
const client = redis.createClient('redis://localhost:6379');

client.connect();

if (client.isOpen) {
  console.log('Connected to redisDB');
} else {
  console.log('Redis not connected!');
}

const {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand
} = require('@aws-sdk/client-s3');

// Set the AWS Region.
const REGION = 'ap-south-1';

// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  region: REGION,
  signer: {
    sign: async (request) => request
  }
});

const getImagesFromBucket = async (bucketName) => {
  try {
    // Check if data is available in the cache
    const cacheKey = `images:${bucketName}`;
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      console.log('Fetching images from cache');
      return JSON.parse(cachedData);
    }

    const bucketParams = { Bucket: bucketName };
    const listObjectsData = await s3Client.send(
      new ListObjectsCommand(bucketParams)
    );
    const images = [];

    // Loop through the objects returned and retrieve images
    for (const object of listObjectsData.Contents) {
      if (object.Key.endsWith('.jpg') || object.Key.endsWith('.png')) {
        // Get the image object from S3
        const getObjectParams = { Bucket: bucketName, Key: object.Key };
        const imageObject = await s3Client.send(
          new GetObjectCommand(getObjectParams)
        );

        // Assuming you want the image data as base64
        const imageDataBase64 = imageObject.Body.toString('base64');

        // Add the image data to the images array
        images.push({ key: object.Key, data: imageDataBase64 });
      }
    }

    // Cache the data into Redis with an expiration time of 1 hour (3600 seconds)
    await client.setEx(cacheKey, 3600, JSON.stringify(images));

    return images;
  } catch (err) {
    console.log('Error', err);
    throw err;
  }
};

exports.getAllImages = catchAsync(async (req, res) => {
  const bucketName = 'testbucketfp'; // Replace with your actual bucket name
  // Extract the pagination parameters from query parameters, or use default values if not provided
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Fetch data from S3 or use cached data if available
  const allImages = await getImagesFromBucket(bucketName);

  // Count the total number of images in the bucket
  const totalImages = allImages.length;

  // Calculate the total number of pages based on the total images and limit per page
  const totalPages = Math.ceil(totalImages / limit);

  // Apply pagination and limit the number of images
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const images = allImages.slice(startIndex, endIndex);

  // Extract the image links from the retrieved images and create an array of links
  const imageLinks = images.map((image) => {
    return {
      key: image.key,
      link: `https://s3.${REGION}.amazonaws.com/${bucketName}/${encodeURIComponent(
        image.key
      )}`
    };
  });

  // Send the image links as the response
  res.status(200).json({
    status: 'success',
    images: imageLinks,
    totalPages: totalPages
  });
});
