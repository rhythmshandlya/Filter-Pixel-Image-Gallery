const express = require('express');
const axios = require('axios');
const { google } = require('googleapis');
const { catchAsync } = require('../util/catchAsync');
const { GoogleAuth } = require('google-auth-library');
const keys = require('./secrets.json');
const redis = require('redis');
const config = require('../config');

// Replace config.REDIS_URI with your actual Redis URI or connection details
let client = redis.createClient(config.REDIS_URI);
client.connect();

if (client.isOpen) {
  console.log('Connected to redisDB');
} else {
  console.log('Redis not connected!');
}

client.on('connect', () => {
  console.log('Connected to RedisDB');
});

async function getImagesFromDrive() {
  // Check if data is available in the cache
  const cacheKey = 'images_from_drive'; // A general key for the cached images
  const cachedData = await client.get(cacheKey);

  if (cachedData) {
    console.log('Using cached data...');
    return JSON.parse(cachedData);
  }

  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/drive'
  });

  // Create a Drive API client
  const service = google.drive({ version: 'v3', auth });

  const files = [];
  // Set the folder ID where your images are located in Google Drive
  const folderId = '1_qOJ0z3kI_e2IJq4X6HqF0T1ROBESygS';

  // List the files in the folder
  const response = await service.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/'`,
    fields: 'files(id, name, webViewLink)'
  });

  const images = response.data.files;

  // Cache the data into Redis with an expiration time of 1 hour (3600 seconds)
  await client.setEx(cacheKey, 3600, JSON.stringify(images));

  return images;
}

exports.getAllImages = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  let images = await getImagesFromDrive();

  const totalImages = images.length;
  const totalPages = Math.ceil(totalImages / limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  images = images.slice(startIndex, endIndex);

  let imageLinks = [];
  for (const image of images) {
    imageLinks.push({
      key: image.name,
      link: `https://lh3.googleusercontent.com/d/${image.id}`
    });
  }

  res.status(200).json({
    status: 'success',
    images: imageLinks,
    totalPages: totalPages
  });
});
