import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { jwtDecode } from 'jwt-decode'



export async function middleware(req: NextRequest){
    const token = await getToken({ req, secret: process.env.SECRET }) as any
    const apiToken = cookies().get('pergamum.token')?.value ?? ''
    const getDecodedApiToken = (): any => {
        try{
            return jwtDecode(apiToken)
        }catch(error){
            return null
        }
    }
    
    const decodedApiToken = getDecodedApiToken()

    if(token && decodedApiToken){         
        if(Date.now() >= token?.exp * 1000) return NextResponse.redirect(new URL('/login', req.url)) 
        
        if(Date.now() >= decodedApiToken.exp * 1000)  return NextResponse.redirect(new URL('/login', req.url))

        
        if(req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register'){
            return NextResponse.redirect(new URL('/', req.url))
        }
       
        return NextResponse.next()
    }

    if(req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register'){
        return NextResponse.next()
    }

   return NextResponse.redirect(new URL('/login', req.url))
}

export const config = { matcher: [
    '/login','/register' ,'/', '/books/:path*', '/videos/:path*',  '/users/:path*', '/profile', '/rents/:path*'
] }