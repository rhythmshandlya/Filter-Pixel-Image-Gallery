# FilterPixel Image Gallery

The aim of this project is to create an image gallery for FilterPixel, accessible only to logged-in users.

## How it Works

1. To access the gallery, users must log in with either their Google account or by using a username & password.

2. After logging in, the images are fetched from both an S3 bucket/Google Drive.

3. Users can interact with the images, and the gallery supports pagination.

## Tech Stack

- Front-end: [React | Javascript]
- Back-end: [Express | Javascript]

## Features and Points

- Gallery front-end with image interaction options like zoom in and out, rotate.
- Server Side Pagination, and client side rendering of the pages.
- Google Login & Sign-up, one tap log in, render users profile(name, image and email) from his gmail account.
- Email/Username & Password-based Login & Sign-up using JWT(OAuth)
- MVC architecture on server side.
- React custom hooks, private routers, Auth/NoAuth required routes.
- Protected Routing on both Server side for all endpoints.
- Persistent Optimized authorization on client side.
- Fetch Images from S3 Bucket And Cash Them For 30min(redis).

- Fetch Images from Google Drive Not Implemented

## Getting Started

1. Clone the repository: [https://github.com/rhythmshandlya/Filter-Pixel-Image-Gallery]

2. Install the required dependencies:

3. Set up the back-end and database:

4. Set up Google API credentials:

5. Run the development server:

- Dockerfiles not optimal for use yet

## Folder Structure

- `client/`: Contains the front-end source code
- `server/`: Contains the back-end source code
