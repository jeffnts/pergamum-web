'use server'

import { api } from 'libs/api/server'

export async function createBook(data: any){
    return api.post('/books', data)
}