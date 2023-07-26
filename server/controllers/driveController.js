const express = require('express');
const axios = require('axios');
const { google } = require('googleapis');
const { catchAsync } = require('../util/catchAsync');
const { GoogleAuth } = require('google-auth-library');
const keys = require('./secrets.json');

async function getImagesFromDrive() {
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

  return response.data.files;
}

exports.getAllImages = catchAsync(async (req, res) => {
  let images = await getImagesFromDrive();

  let imageLinks = [];
  for (const image of images) {
    imageLinks.push({ key: image.name, link: image.webViewLink });
  }

  res.status(200).json({
    status: 'success',
    images: imageLinks
  });
});
