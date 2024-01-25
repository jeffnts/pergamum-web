import Image from 'next/image'
import { LoginForm } from './components'
import libraryIcon from 'assets/images/library.png'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pergamum - Login',
}

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2 text-center">Login</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-center">
            Seja bem vindo! Faça o login para entrar em sua conta.
          </p>
          <LoginForm />
        </div>
      </div>
      <div className="hidden md:block md:w-1/2">
        <Image
          alt="Books"
          className="h-full w-full object-cover"
          height="1080"
          src={libraryIcon}
          style={{
            aspectRatio: '1920/1080',
            objectFit: 'cover',
          }}
          width="1920"
        />
      </div>
    </div>
  )
}
