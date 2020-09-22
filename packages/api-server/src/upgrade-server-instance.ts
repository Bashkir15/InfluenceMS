import { FastifyInstance } from 'fastify'
import cookiePlugin from 'fastify-cookie'
import corsPlugin from 'fastify-cors'

import { securityMiddleware } from '@influence-ms/shared'

export async function upgradeServerInstance(instance: FastifyInstance): Promise<FastifyInstance> {
    instance.register(cookiePlugin, {
        secret: process.env.COOKIE_SECRET
    })
    instance.register(corsPlugin, {
        credentials: true,
        origin: process.env.IS_DEPLOY ? 'https://infuence-ms.com' : '*'
    })
    instance.register(securityMiddleware)

    return instance
}