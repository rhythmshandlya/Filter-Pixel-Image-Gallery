const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '744772269602-8vq8k2e2nan661fm2fq27a4k1v5qae87.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email']
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
