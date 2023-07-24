const User = require('./../models/userModel');
const { catchAsync } = require('../util/catchAsync');
const { filterData } = require('../util/filterData');
const AppError = require('../util/AppError');

// Assuming you have already required your User model and other dependencies at the top of the file
exports.getAllUsers = catchAsync(async (req, res, next) => {
  // Parse the page and limit parameters from the query string with default values
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Calculate the number of documents to skip based on the page and limit
  const skip = (page - 1) * limit;

  // Get the total count of documents in the collection
  const totalCount = await User.countDocuments();

  // Fetch users based on the skip and limit values
  const users = await User.find().skip(skip).limit(limit);

  res.status(200).json({
    status: true,
    length: users.length,
    total: totalCount,
    users
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json({
      status: true,
      user: {
        name: user.name,
        email: user.email
      }
    });
  } else {
    next(new AppError('User not found', 404));
  }
});
