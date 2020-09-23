import { UserProviderNames, UserProviders } from '@influence-ms/types'

export function createOAuthArgs(strategy: UserProviderNames, options = {}) {
    return {
        callbackURL: `/auth/${strategy}/callback`,
        clientID: process.env[`${strategy.toUpperCase()}_CLIENT_ID`],
        clientSecret: process.env[`${strategy.toUpperCase()}_CLIENT_SECRET`],
        ...options
    }
}

export function getDefaultProviders(provider: { [key: UserProviderNames]: string }): UserProviders {
    return {
        facebook: null,
        google: null,
        github: null,
        instagram: null,
        mixer: null,
        spotify: null,
        twitch: null,
        twitter: null,
        youtube: null,
        ...provider
    }
}

export function pickStandardEmail(profile) {
    return (profile.emails && profile.emails.length > 0 && profile.emails[0].value) || null
}

export function pickStandardPhoto(profile) {
    return (profile.photos && profile.photos.length > 0 && profile.photos[0].value) || null
}

