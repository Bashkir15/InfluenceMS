import { DBUser, UserProviderNames } from '@influence-ms/types'

import { UserModel } from '../models'

export async function createOrFindUser(user: Partial<DBUser>, providerMethod: UserProviderNames) {
    const getStoredUser = async (): Promise<DBUser | boolean> => {
        if (user.id) return getUserById(user.id)
        if (user[providerMethod]) return getUserByProvider(providerMethod, user[providerMethod])
        return false
    }

    try {
        const storedUser = await getStoredUser()
        if (storedUser && storedUser.id) {
            return storedUser
        }

        return new UserModel(user).save()
    } catch (err) {
        if (user.id) {
            console.error(err)
            return null
        }

        return new UserModel(user).save()
    }
}

export async function getUserById(id: string): Promise<DBUser> {
    return UserModel.findById(id).exec()
}

export async function getUserByProvider(providerName: UserProviderNames, providerValue: string): Promise<DBUser> {
    return UserModel.findOne().where(`providers.${providerName}`).equals(providerValue).exec()
}   