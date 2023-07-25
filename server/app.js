const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const sanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passportStrategy = require('./passport');

const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const s3Router = require('./routes/s3Router');
const driveRouter = require('./routes/driveRouter');
const googleAuthRouter = require('./routes/googleAuthRouter');

const app = express();

app.use(
  cookieSession({
    name: 'session',
    keys: ['cyberwolve'],
    maxAge: 24 * 60 * 60 * 100
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

const AppError = require('./util/AppError');
const globalErrHandler = require('./controllers/errorController');

const corsOptions = {
  origin: true,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(helmet());

if (process.env.MODE == 'DEV') {
  app.use(morgan('dev'));
}

app.use(sanitize());
app.use(xss());

app.use('/ping', (req, res) => {
  res.status(200).json({
    message: 'pong'
  });
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/s3', s3Router);
app.use('/api/drive', driveRouter);
app.use('/auth', googleAuthRouter);

app.use('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrHandler);
module.exports = app;
