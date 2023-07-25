const AppError = require('../util/AppError');
const { catchAsync } = require('../util/catchAsync');

// Define the getImagesFromBucket function here (the one from the previous answer)
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

    return images;
  } catch (err) {
    console.log('Error', err);
    throw err;
  }
};

exports.getAllImages = catchAsync(async (req, res) => {
  const bucketName = 'testbucketfp'; // Replace with your actual bucket name

  try {
    // Extract the pagination parameters from query parameters, or use default values if not provided
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Get all images from the bucket
    const allImages = await getImagesFromBucket(bucketName);

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
      data: {
        images: imageLinks
      }
    });
  } catch (err) {
    // Handle errors and send an error response
    console.log('Error:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
});
