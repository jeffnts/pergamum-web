'use client'
import { destroyCookie } from 'nookies'

import { signOut, signIn } from 'next-auth/react'

export function logout(){
    destroyCookie(undefined, "pergemum.token")
    signOut()
}

type LoginRequest = {
    type: string,
    data: any
}

export async function login(values: LoginRequest){
    try{
        const { type, data } = values

        return signIn(type, data)
    }catch(error){
        throw error
    }
}

