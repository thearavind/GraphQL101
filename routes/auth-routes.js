'use strict'

import Router from 'koa-router'
import bcrypt from 'bcrypt'
import { JWTGenerator } from '../utils'
import db from '../models/db'
import passport from 'koa-passport'
import { randomBytes } from 'crypto'
import { promisify } from 'util'

const router = new Router()
const randomBytesPromise = promisify(randomBytes)

router.post('/login', async (ctx) => {
    return passport.authenticate('local', async (err, user, info, status) => {
        if (user === false) {
          ctx.body = { success: false };
          ctx.throw(401);
        } else {
            await ctx.login(user)
            const token = JWTGenerator(user._id)
            const randBuffer = await randomBytesPromise(256)
            return db.students.update({refresh_token: randBuffer.toString('hex')},{where: {email_id: ctx.request.body.email_id}})
          ctx.body = { success: true }
        }
      })(ctx)
    // const user = await db.students.find({where: {email_id: ctx.request.body.email_id}})
    // if (user) {
    //     const validPass = await bcrypt.compare(ctx.request.body.password, user.password_hash)
    //     if (validPass) {
    //         console.log(JWTGenerator(user.id))
    //         ctx.body = {status: 200, payload: [{auth_token: JWTGenerator(user.id)}]}
    //     } else {
    //         ctx.body = {status: 401, payload: [{message: 'Password is not valid'}]}
    //     }
    // } else {
    //     ctx.body = {status: 404, payload: [{message: 'User does not exist'}]}
    // }
})

router.post('/register', async (ctx) => {
    const user = await db.users.find({
        where: {email_id: ctx.request.body.email_id}
    })
    if (user) {
        ctx.body = {status: 409, payload: [{message: 'User already exist'}]}
    } else {
        const hash = await bcrypt.hash(ctx.request.body.password, 10)
        const newOwner = await db.users.create({
            username: ctx.request.body.username,
            email_id: ctx.request.body.email_id,
            sex: ctx.request.body.sex,
            designation: ctx.request.body.designation,
            joined_date: ctx.request.body.joined_date,
            department: ctx.request.body.department,
            password_hash: hash
        })
        ctx.body = {status: 200, payload: [newOwner]}
    }
})

export default router
