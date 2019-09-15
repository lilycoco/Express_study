import keys from '../config/keys'
import passport from "passport";
import google = require("passport-google-oauth20");
import mongoose from 'mongoose'
const User = mongoose.model('users')

passport.serializeUser((user: any, done: any) => {
  done(null, user.id)
})

passport.deserializeUser((id: any, done: any) => {
  User.findById(id).then((user: any) => {
    done(null, user)
  })
})

const clientID = keys.googleClientID;
const clientSecret = keys.googleClientSecret;
const callbackURL = '/auth/google/callback';

if (typeof clientID === "undefined") {
  throw new Error("clientID is undefined");
}
if (typeof clientSecret === "undefined") {
  throw new Error("clientSecret is undefined");
}
if (typeof callbackURL === "undefined") {
  throw new Error("callbackURL is undefined");
}


passport.use(
  new google.Strategy(
    {
      clientID,
      clientSecret,
      callbackURL,
      proxy: true,
    },
    async (_accessToken: any, _refreshToken: any, profile: any, done: any) => {
      console.log(profile)

      const existingUser = await User.findOne({ googleId: profile.id })
      if (existingUser) {
        return done(null, existingUser)
      }
      const user = await new User({ googleId: profile.id }).save()
      done(null, user)
    },
  ),
)
