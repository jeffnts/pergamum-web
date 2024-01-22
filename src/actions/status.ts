'use server'
import { api } from 'libs/api/server'

export async function updateStatus(userId: string, statusId: string){
    return api.put('/users/status', {
        userId,
        statusId
    })
}