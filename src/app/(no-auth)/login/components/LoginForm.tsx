'use client'

import { useMutation } from 'react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  REQUIRED_FIELD,
  INVALID_EMAIL,
  INVALID_EMAIL_OR_INVALID_PAWWSORD,
} from 'consts/errors'
import { login } from 'services/auth'

export function LoginForm() {
  const { push } = useRouter()

  const loginSchema = z.object({
    email: z.string().email(INVALID_EMAIL).min(1, REQUIRED_FIELD),
    password: z.string().min(1, REQUIRED_FIELD),
  })

  type loginSchemaFormData = z.infer<typeof loginSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<loginSchemaFormData>({
    resolver: zodResolver(loginSchema),
  })

  const { mutate, isLoading } = useMutation(login, {
    onSuccess(result) {
      console.log({ result })
      if (result?.status !== 200) {
        setError('email', { message: INVALID_EMAIL_OR_INVALID_PAWWSORD })
        setError('password', { message: INVALID_EMAIL_OR_INVALID_PAWWSORD })
        return
      }

      push('/')
    },
  })

  function onSubmit(values: loginSchemaFormData) {
    mutate({
      type: 'credentials',
      data: {
        message: JSON.stringify(values),
        redirect: false,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Input
          label="Email"
          className="w-full"
          placeholder="Digite seu endereço de E-mail"
          required
          type="email"
          errors={errors}
          {...register('email')}
        />
      </div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <Label className="block mb-2" htmlFor="password">
            Password
          </Label>
          <Link
            className="text-sm text-gray-500 dark:text-gray-400 underline"
            href="#"
          >
            Esqueceu sua senha?
          </Link>
        </div>
        <Input
          className="w-full"
          required
          type="password"
          placeholder="Digite sua Senha"
          errors={errors}
          {...register('password')}
        />
      </div>
      <Button disabled={isLoading} className="w-full mb-4" type="submit">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Entrar
      </Button>
      <div className="text-center">
        Não tem uma conta ainda?
        <Link className="text-blue-500 underline" href="/register">
          Criar Conta
        </Link>
      </div>
    </form>
  )
}
