const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

async function scrapeImagesFromURL(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const imageUrls = [];

    $('img').each((index, element) => {
      const imageUrl = $(element).attr('src');
      if (imageUrl) {
        imageUrls.push(imageUrl);
      }
    });

    return imageUrls;
  } catch (error) {
    throw new Error('Error scraping images from the provided URL.');
  }
}

exports.getAllImages = async (req, res) => {
  const { url } = req.query;

  if (!url || !url.startsWith('https://photos.google.com')) {
    return res
      .status(400)
      .json({ error: 'Invalid or missing Google Photos URL.' });
  }

  try {
    const imageUrls = await scrapeImagesFromURL(url);
    res.json({ images: imageUrls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
