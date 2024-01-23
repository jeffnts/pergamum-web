
import { cookies } from 'next/headers'

const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL

const getHeaders = (body?: any, token) => {
    const contentType = body instanceof FormData? null: { 'Content-Type': 'application/json',}
   return {
    ...contentType,
    Authorization: `Bearer ${token}`
   }
}


export const api = {
    async get(url: string){
        const token = cookies().get('pergamum.token')?.value
       
        const response  = await fetch(`${apiUrl}${url}`, {
            headers: getHeaders(null, token),
            method: 'GET'
        })

        const result = await response.json()
        
        if(response.status !== 200){
            throw result
        }

        return result
        
    },

    async post(url: string, body?: any){
        const token = cookies().get('pergamum.token')?.value

       const response = await  fetch(`${apiUrl}${url}`, {
            headers: getHeaders(body, token),
            body: body instanceof FormData? body: JSON.stringify(body),
            method: 'POST'
        })

        const result = await response.text()

        if(response.status !== 201){
            throw result
        }

        return result
    },

    async put(url: string, body?: any){
        const token = cookies().get('pergamum.token')?.value

       const response = await  fetch(`${apiUrl}${url}`, {
            headers: getHeaders(body, token),
            body: body instanceof FormData? body: JSON.stringify(body),
            method: 'PUT'
        })
        
        const result = await response.text()

        if(response.status !== 200){
            throw result
        }

        return result
    },

    async patch(url: string, body?: any){
        const token = cookies().get('pergamum.token')?.value

       const response = await  fetch(`${apiUrl}${url}`, {
            headers: getHeaders(body, token),
            body: body instanceof FormData? body: JSON.stringify(body),
            method: 'PATCH'
        })
        
        const result = await response.text()

        if(response.status !== 200){
            throw result
        }

        return result
    },

    async delete(url: string){
        const token = cookies().get('pergamum.token')?.value

       const response = await  fetch(`${apiUrl}${url}`, {
            headers: getHeaders(null, token),
            method: 'DELETE'
        })
        
        const result = await response.text()

        if(response.status !== 200){
            throw result
        }

        return result
    }
}