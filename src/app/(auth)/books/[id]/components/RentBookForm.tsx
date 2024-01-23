'use client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { rentBook } from 'actions/books'

import { Button } from '@/components/ui/button'

export function RentFormBook({ id }: { id: string }) {
  const { toast } = useToast()
  const { push } = useRouter()

  const { register, handleSubmit } = useForm()

  async function onSubmit(values: any) {
    const { id } = values
    const result = await rentBook(id)

    if (result?.error) {
      toast({
        description: result.error as any,
        variant: 'destructive',
      })
    } else {
      push('/rents')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
      <input {...register('id')} type="hidden" value={id} />
      <Button type="submit">Confirmar o empréstimo.</Button>
    </form>
  )
}
