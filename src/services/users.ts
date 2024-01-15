import { api } from 'libs/api'
import { signIn } from 'next-auth/react'


export async function registerUser(values: any){
   try{
    const { email, password } = values
    await api.post('/users', values)
   
    await signIn('credentials', {
        message: JSON.stringify({ email, password}),
        redirect: false
    })
   }catch(error: any){
    throw error.message
   }
}