
import { parseCookies } from 'nookies'

const { 'pergamum.token': token } = parseCookies() 
const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL

export const api = {
    async get(url: string){
        const response  = await fetch(`${apiUrl}${url}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            method: 'GET'
        })

        const result = await response.json()

        if(response.status !== 201){
            throw result
        }

        return result
        
    },

    async post(url: string, body: any){
       const response = await  fetch(`${apiUrl}${url}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body),
            method: 'POST'
        })

        const result = await response.text()

        if(response.status !== 201){
            throw result
        }

        return result
    }
}