import { model, Schema } from 'mongoose'

export const UserModel = model('user', new Schema({
    createdAt: {
        default: Date.now,
        type: Date
    },
    email: String,
    facebookProviderID: String,
    githubProviderID: String,
    googleProviderID: String,
    instagramProviderID: String,
    name: String,
    profilePhoto: String,
    spotifyProviderID: String,
    twitchProviderID: String,
    twitterProviderID: String,
    youtubeProviderID: String
}))
