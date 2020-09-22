import passport from 'fastify-passport'
import secureSession from 'fastify-secure-session'

import { initializePassport } from './initialize-passport'

export function authService(instance, options, done) {
    initializePassport()
    instance.register(secureSession)
    instance.register(passport.initialize())
    instance.register(passport.secureSession())

    done()
}