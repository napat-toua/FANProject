const { session } = require("passport");
const passport = require("passport");
const config = require("../config/index");
const { findById } = require("../models/user");
const User = require("../models/user")

const JwtStrategy = require('passport-jwt').Strategy, ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.SECRET_KEY;
//opts.issuer = 'accounts.examplesoft.com';
//opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {

        const user = await User.findById(jwt_payload.id)
        if(!user){
            return done(new Error("User not found"), null)
        }

        return done(null, user)

    } catch (error) {
        done(error)
    }
}));

module.exports.isLogin = passport.authenticate("jwt", { session: false })