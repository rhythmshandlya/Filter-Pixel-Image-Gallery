const User = require('./../models/userModel');
const { promisify } = require('util');
const { catchAsync } = require('../util/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../util/AppError');
const jwt_decode = require('jwt-decode');

const getJwt = (userId, secret, exp) => {
  return jwt.sign({ id: userId }, secret, {
    expiresIn: exp
  });
};

const extractPayload = (jwt) => {
  const base64Url = jwt.split('.')[1]; // Get the second part (payload) of the JWT
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convert URL-safe Base64 to regular Base64
  const payloadJson = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  ); // Decode Base64 and convert to a JSON string
  const payload = JSON.parse(payloadJson); // Parse the JSON string to get the payload object
  return payload;
};

exports.signup = catchAsync(async (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.email || !body.password) {
    next(new AppError('Please provide name, email and password', 400));
  }

  const newUser = await User.create({
    name: body.name,
    email: body.email,
    password: body.password
  });
  const token = getJwt(
    newUser._id,
    process.env.JWT_SECRET,
    process.env.JWT_EXPIRY
  );

  res.status(201).json({
    status: true,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      dp: newUser.dp
    },
    token
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password)
    return next(new AppError('please provide email and password', 400));

  const user = await User.findOne({ email }).select('+password');
  console.log(user);

  if (!user) return next(new AppError('User Not Found!', 401));

  if (!(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect Email Or Password!', 401));
  }

  const token = getJwt(
    user._id,
    process.env.JWT_SECRET,
    process.env.JWT_EXPIRY
  );

  res.status(200).json({
    status: true,
    token,
    user
  });
});

exports.googleAuth = async (req, res, next) => {
  const token = req.body.token;
  const payload = extractPayload(token);
  console.log(payload);

  try {
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      // User is not registered, perform signup
      user = await User.create({
        name: payload.name,
        email: payload.email,
        password: payload.jti,
        dp: payload.picture
      });
    }

    // Perform login and generate JWT token
    const token = getJwt(
      user._id,
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRY
    );

    res.status(200).json({
      status: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        dp: user.dp
      },
      token
    });
  } catch (err) {
    // Handle any errors that occur during database operations
    return next(new AppError('Something went wrong', 500));
  }
};

exports.protect = catchAsync(async (req, res, next) => {
  let token = '';
  if (
    (req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')) ||
    req.cookies.jwt
  ) {
    token = req.cookies.jwt || req.headers.authorization.split(' ')[1];
  }
  if (!token) return next(new AppError('Please login to get access.', 401));

  const payLoad = await promisify(jwt.verify)(token, process.env.JWT);
  const user = await User.findById(payLoad.id).select('+isVerified');
  if (!user.isVerified)
    return next(
      new AppError('Please verify your email to access this route', 401)
    );

  if (!user) return next(new AppError('User does not exists any longer', 401));

  if (user.changedPassword(payLoad.iat)) {
    return next(new AppError('Password was changed, please login again', 401));
  }
  req.user = user;
  next();
});
