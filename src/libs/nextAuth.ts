import { AuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from 'next/headers'


export const authOptions: AuthOptions = {    
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: { },
            async authorize(credentials: any) {
                try{
                    const tokenRequest = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: credentials?.message,
                        method: 'POST'
                    })
                    
                    if(tokenRequest.status !== 201) return null 

                    const token = await tokenRequest.text() 

                    cookies().set('pergamum.token', token)
                    
                    const userRequest = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        method: 'GET'
                    })

                    const user = await userRequest.json()
                    
                    return user
                }catch(error){
                    return null
                }
            },
            
          })
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            return {
                ...token,
                ...user
            }
          },
          session({ session, token }: any) {
            session.user = token
            return session
          }
    },        
    secret: process.env.SECRET,    
    pages: {
        signIn: '/login'
    }
}
