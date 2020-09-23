export interface DBUser {
    createdAt: string
    email?: string
    id: string
    isOnline?: boolean
    lastSeen?: string
    modifiedAt?: string
    name: string
    profilePhoto?: string
    providers: {
        facebook?: string
        github?: string
        google?: string
        instagram?: string
        mixer?: string
        spotify?: string
        twitch?: string
        twitter?: string
        youtube?: string
    }
    timezone?: number
    website?: string
}