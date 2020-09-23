import passport from 'passport-fastify'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'

import { createOrFindUser } from '../../../db'

import { createOAuthArgs, getDefaultProviders, pickStandardEmail } from './shared'

export function useGoogleStrategy() {
    passport.use(
        new GoogleStrategy(createOAuthArgs({ passReqToCallback: true })),
        async (req, token, tokenSecret, profile, done) => {
            const name = profile.displayName || profile.username || profile._json.name || ''

            if (req.user && req.user.providers.google != null) {
                return done(null, req.user)
            }

            const user = {
                ...getDefaultProviders({ google: profile.id }),
                email: pickStandardEmail(profile),
                name
            }

            try {
                const targetUser = await createOrFindUser(user, 'google')
                done(null, targetUser)
            } catch (err) {
                done(err)
                return null
            }
        }
    )
}