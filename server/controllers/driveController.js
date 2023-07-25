const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const { catchAsync } = require('../util/catchAsync');

async function getAllImages(req, res) {
  try {
    // Get credentials and build service
    // TODO (developer) - Use appropriate auth mechanism for your app
    const auth = new GoogleAuth({
      scopes: 'https://www.googleapis.com/auth/drive'
    });
    const service = google.drive({ version: 'v3', auth });
    const files = [];

    const response = await service.files.list({
      q: "mimeType='image/jpeg'",
      fields: 'nextPageToken, files(id, name)',
      spaces: 'drive'
    });

    Array.prototype.push.apply(files, response.data.files);

    response.data.files.forEach(function (file) {
      console.log('Found file:', file.name, file.id);
    });

    res.status(200).json({
      status: 'success',
      data: {
        images: response.data.files
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
}

module.exports = {
  getAllImages
};
