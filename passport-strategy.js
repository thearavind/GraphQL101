'use_Strict'

import passport from 'koa-passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import db from './models/db'

passport.use(new LocalStrategy({
    usernameField: 'email_id',
    passwordField: 'password',
    session: false}, (username, password, done) => {
    queryUser({email_id: username, password: password}).then(validUser => {
        return validUser ? done(null, validUser) : done(null, false)
    })
}))

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET
opts.issuer = 'Levitators'
passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    queryUser({_id: jwtPayload.user_id}).then(validUser => {
        return validUser ? done(null, validUser) : done(null, false)
    })
}))

const queryUser = async (user) => {
    console.log(user)
    let validPass = false
    if (user.email_id) {
        const foundUser = await db.users.find({where: { email_id: user.email_id }})
        if (foundUser) {
            validPass = await bcrypt.compare(user.password, foundUser.password_hash)
        }
        return (validPass ? foundUser : null)
    } else if (user._id) {
        const foundUser = await db.users.find({where: { _id: user._id }})
        return (foundUser._id ? foundUser : null)
    }
}

passport.serializeUser((user, cb) => {
    cb(null, user._id)
})

passport.deserializeUser(async (id, cb) => {
    try {
        const foundUser = await db.users.find({where: { _id: id }})
        cb(null, foundUser)
    } catch (e) {
        return cb(e)
    }
})

export default passport
