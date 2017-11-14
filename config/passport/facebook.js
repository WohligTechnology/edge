// var FACEBOOK_APP_ID = '314531289024369';
// var FACEBOOK_APP_SECRET = '28ea06d56e73b9c001bfbe68a4e5e152';
var FACEBOOK_APP_ID = '387547795014120';
var FACEBOOK_APP_SECRET = 'bba8f6f663f5c2484ad2d6f66da570f0';
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
