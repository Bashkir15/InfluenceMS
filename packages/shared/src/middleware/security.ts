import helmetPlugin from 'fastify-helmet'

export function securityMiddleware(instance, options, done) {
    instance.register(helmetPlugin, {
        frameguard: { setTo: 'deny' }
    })
}