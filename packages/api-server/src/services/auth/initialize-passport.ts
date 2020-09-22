import { FastifyRequest } from 'fastify'
import passport from 'fastify-passport'
import stringifyJSON from 'fast-json-stringify'

export function initializePassport() {
    passport.registerUserSerializer(async (user, request: FastifyRequest) => {
        return typeof user === 'string' ? user : stringifyJSON(user)
    })
    passport.registerUserDeserializer(async (serializedUser, request: FastifyRequest) => {
        return JSON.parse(serializedUser)
    })
}