import { FastifyInstance, DoneFuncWithErrOrRes } from 'fastify'
import { URL } from 'url'
import passport from 'fastify-passport'

import { ProviderNames } from '@influence-ms/types'

type StrategyPluginArgs = {
    name: ProviderNames,
    strategyOptions: Record<string, any>
}

const FALLBACK_URL = 'http://localhost:8080/'

export function adoptStrategy(instance: FastifyInstance, options: StrategyPluginArgs, done: DoneFuncWithErrOrRes) {
    const { name, strategyOptions } = options
    instance.get(`/auth/${name}/`, {
        handler: (request, reply) => {},
        preValidation: (request, reply, done) => {
            let url = FALLBACK_URL
            if (typeof request.query.r === 'string') {
                url = request.query.r
            }

            request.session.set('redirectUrl', url)
            return passport.authenticate(name, strategyOptions)(request, reply, done)
        }
    })
    instance.get(`/auth/${name}/callback`, {
        handler: (request, reply) => {
            const redirectUrl = new URL(request.session.get('redirectUrl') || FALLBACK_URL)
            redirectUrl.searchParams.append('authed', 'true')
            
            request.session.set('redirectUrl', undefined)
            reply.setCookie('_influencems_no_cache', '1', {
                maxAge: 31556920000,
                sameSite: 'lax',
                secure: false
            })
            reply.redirect(redirectUrl.href)
        },
        preValidation: passport.authenticate(name, { failureRedirect: `${FALLBACK_URL}/new/user` })
    })
    done()
}