import passport from 'fastify-passport'
import secureSession from 'fastify-secure-session'

import { adoptStrategy } from './adopt-strategy'
import { initializePassport } from './initialize-passport'
import { registerAuthStrategies } from './strategies'

export function authService(instance, options, done) {
    initializePassport()
    registerAuthStrategies()

    instance.register(secureSession, {
        key: process.env.SESSION_SECRET_KEY
    })
    instance.register(passport.initialize())
    instance.register(passport.secureSession())

    instance.register(adoptStrategy, {
        name: 'google',
        strategyOptions:  {
            scope: 'profile email'
        }
    })
    
    done()
}