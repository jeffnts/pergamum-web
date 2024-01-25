import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import userIcom from 'assets/icons/user.svg'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pergamum - Perfil do Usuário',
}

export default async function ProfilePage() {
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] bg-gray-100/40 flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>Informações pessoais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profile-picture">Foto</Label>
              <div className="flex items-center space-x-2">
                <Image
                  alt="Profile Picture"
                  className="rounded-full border"
                  height="45"
                  src={userIcom}
                  style={{
                    aspectRatio: '45/45',
                    objectFit: 'cover',
                  }}
                  width="45"
                />
                <Button className="rounded-full" variant="outline">
                  Upload
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Input
                label="Nome"
                id="name"
                placeholder="Digite seu nome completo"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto  max-sm:w-full">Salvar</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Senha</CardTitle>
            <CardDescription>Recuperação da senha</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                label="E-mail"
                id="name"
                placeholder="Digite seu endereço de e-mail"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="ml-auto  max-sm:w-full">
              Enviar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
