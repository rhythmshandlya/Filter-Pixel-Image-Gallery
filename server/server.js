const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');

// Load environment variables from config.env
dotenv.config({ path: './.env' });

// Connect to the MongoDB server
const uri = process.env.DATABASE_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Handle MongoDB connection success and error
const db = mongoose.connection;
db.on('error', (error) =>
  console.error('MongoDB connection error:', error.message)
);
db.once('open', () => console.log('Connected to the MongoDB database'));

// Start the server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});

// Handle unhandled promise rejections and uncaught exceptions
process.on('unhandledRejection', (err) => {
  console.error(err.name, err.message);
  console.error('Unhandled error occurred, shutting the server down');
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.error(err.name, err.message);
  console.error('Uncaught exception occurred, shutting the server down');
  server.close(() => {
    process.exit(1);
  });
});

// Add a new middleware to the app
app.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);
  next();
});
