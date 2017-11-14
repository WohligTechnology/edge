// var FACEBOOK_APP_ID = '314531289024369';
// var FACEBOOK_APP_SECRET = '28ea06d56e73b9c001bfbe68a4e5e152';
var FACEBOOK_APP_ID = '926327774187165';
var FACEBOOK_APP_SECRET = '2e169ce61b1a642824bb60c9faf03020';
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    profileFields: ['id', 'emails', 'name','displayName'],
    callbackURL: global["env"].realHost + "/api/User/loginFacebook" 
  },
//profileFields: ['emails', 'displayName', 'username']
  function(accessToken, refreshToken, profile, cb) {
  
    profile.AccessToken = accessToken;
    profile.RefreshToken = refreshToken;
    return cb(profile);
    
  }
));
