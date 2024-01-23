'use server'
import { revalidatePath } from 'next/cache'
import { api } from 'libs/api/server'

export async function createOrUpdateBook(data: FormData){
    try{
        revalidatePath('books')
        const id: any = data.get('id') || ''
        const result = await  id?.length? api.patch(`/books/${id}`, data): await api.post('/books', data)

        if(id) {
            revalidatePath(`/books/${id}`)
        }

        return result
    }catch(error: any){
        return {
            error: JSON.parse(error)?.message
        }
    }
}

export async function removeBook(data: FormData){
    const id = data.get('id')
    await api.delete(`/books/${id}`)
    revalidatePath(`/books/${id}`)
}

export async function rentBook(id: string){
    try{
        await api.post(`/books/${id}/rents`)
        revalidatePath(`/books/${id}`)
    }catch(error: any){
        return {
            error: JSON.parse(error)?.message
        }
    }
}

export async function updateRentBook(id: string){
    try{
        const result = await api.patch(`/rents/${id}`)
        revalidatePath(`/rents/${id}`)
        return result
    }catch(error: any){
        return {
            error: JSON.parse(error)?.message
        }
    }
}