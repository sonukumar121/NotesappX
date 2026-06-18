import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
 dotenv.config();

 
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  }, async (accessToken, refreshToken, profile, done) => {
      try {

        let user = await User.findOne({
          googleId: profile.id,
        });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
          });
        }

        return done(null, user);

      } catch (error) {
        return done(error, null);
      }
    }
  )
)





passport.serializeUser(function(user, done) {
  done(null, user);  //session information save 
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(null, user);  ///session information delete
  });
});