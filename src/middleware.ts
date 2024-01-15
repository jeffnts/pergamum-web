import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'


export async function middleware(req: NextRequest){
    const token = await getToken({ req, secret: process.env.SECRET }) as any
   
    if(token){         
        if(Date.now() >= token?.exp * 1000) return NextResponse.redirect(new URL('/login', req.url))      

       
        return NextResponse.next()
    }

   return NextResponse.redirect(new URL('/login', req.url))
}

export const config = { matcher: [
    '/', '/books/:path*', '/videos/:path*', '/profile'
] }