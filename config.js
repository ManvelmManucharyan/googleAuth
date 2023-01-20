require("dotenv").config();
const passport  = require("passport");
const passportGoogle = require("passport-google-oauth2");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const GoogleStrategy = passportGoogle.Strategy;

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/redirect",
    }, (requrest, accessToken, refreshToken, profile, done) => {
        done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})