'use client'
import Link from 'next/link'
import { useMutation } from 'react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  REQUIRED_FIELD,
  INVALID_EMAIL,
  PASSWORD_NOT_MATCH,
  FIREBASE_EMAIL_ERROR_CODE,
  EMAIL_ALREADY_IN_USE,
} from 'consts/errors'
import { registerUser } from 'services/users'

export function RegisterForm() {
  const { push } = useRouter()

  const registerSchema = z
    .object({
      name: z.string().min(1, REQUIRED_FIELD),
      email: z.string().email(INVALID_EMAIL).min(1, REQUIRED_FIELD),
      password: z.string().min(1, REQUIRED_FIELD),
      passwordConfirmation: z.string().min(1, REQUIRED_FIELD),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: PASSWORD_NOT_MATCH,
      path: ['passwordConfirmation'],
    })

  type registerSchemaFormData = z.infer<typeof registerSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<registerSchemaFormData>({
    resolver: zodResolver(registerSchema),
  })

  const { mutate, isLoading } = useMutation(registerUser, {
    onSuccess() {
      push('/')
    },
    onError(error) {
      if (error === FIREBASE_EMAIL_ERROR_CODE) {
        setError('email', { message: EMAIL_ALREADY_IN_USE })
      }
    },
  })

  function onSubmit(values: registerSchemaFormData) {
    mutate(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Input
          label="Nome"
          className="w-full"
          placeholder="Digite seu nome completo"
          required
          errors={errors}
          {...register('name')}
        />
      </div>

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

      <div className="mb-4">
        <Input
          label="Senha"
          className="w-full"
          placeholder="Digite sua senha"
          required
          type="password"
          errors={errors}
          {...register('password')}
        />
      </div>

      <div className="mb-4">
        <Input
          label="Confirmar Senha"
          className="w-full"
          placeholder="Confirme sua senha"
          required
          type="password"
          errors={errors}
          {...register('passwordConfirmation')}
        />
      </div>

      <Button disabled={isLoading} className="w-full mb-4" type="submit">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Entrar
      </Button>

      <Button
        asChild
        variant="outline"
        disabled={isLoading}
        className="w-full mb-4"
        type="submit"
      >
        <Link href="/login">Voltar para a tela de Login</Link>
      </Button>
    </form>
  )
}
