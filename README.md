# FilterPixel Image Gallery

The aim of this project is to create an image gallery for FilterPixel, accessible only to logged-in users.

## Features and Points

- Gallery front-end with image interaction options like zoom in and out, and rotate.
- Server Side Pagination, and client-side rendering of the pages.
- Google Login & Sign-up, one tap log in, render users profile(name, image and email) from his gmail account.
- Email/Username & Password-based Login & Sign-up using JWT(OAuth)
- MVC architecture on the server side.
- React custom hooks, private routers, Auth/NoAuth required routes.
- Protected Routing on both Server sides for all endpoints.
- Persistent Optimized authorization on the client side.
- Fetch Images from S3 Bucket And Cash Them For 30min(redis).
- Fetch Images from Google Drive And Cash Them

## Tech Stack

- Front-end: [React | Javascript]
- Back-end: [Express | Javascript]

## Screen Shots

![image](https://github.com/rhythmshandlya/Filter-Pixel-Image-Gallery/assets/72724768/514b33e0-d145-437a-be12-6a90f5d7c8b8)
![image](https://github.com/rhythmshandlya/Filter-Pixel-Image-Gallery/assets/72724768/acd245e8-a144-4295-bf3e-1d2cd7cbf7d7)
![image](https://github.com/rhythmshandlya/Filter-Pixel-Image-Gallery/assets/72724768/5debc673-74b6-498b-84e7-b5d621f9a485)
![s](https://github.com/rhythmshandlya/Filter-Pixel-Image-Gallery/assets/72724768/cfebf470-5425-4964-8360-ee4dd5b61a25)

## Getting Started

1. Clone the repository: [https://github.com/rhythmshandlya/Filter-Pixel-Image-Gallery]

2. Install the required dependencies:

```shell
    npm install && npm run install
```

3.Set up the back end and database:
make sure redis and mongoDB is running locally.

4.Set up Google API credentials And Env Variables:
Copy google API credentials into a secret.json file and add env variable GOOGLE_APPLICATION_CREDENTIALS to your env.

5.Run the development server:

if you want them to run concurrently

```shell
    npm start
```

else

```shell
    cd client &&  npm start
    cd server && npm start
```

## Folder Structure

- `client/`: Contains the front-end source code
- `server/`: Contains the back-end source code
