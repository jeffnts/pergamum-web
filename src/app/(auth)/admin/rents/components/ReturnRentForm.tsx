'use client'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { returnRentBook } from 'actions/books'

export function ReturnRentForm({ id }: { id: string }) {
  const { toast } = useToast()

  const { register, handleSubmit } = useForm()

  async function onSubmit(value: any) {
    const { id } = value
    const result: any = await returnRentBook(id)

    if (result?.error) {
      toast({
        description: result.error as any,
        variant: 'destructive',
      })
    } else {
      toast({
        description: result as any,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" value={id} {...register('id')} />
      <Button type="submit">Confirmar Devolução.</Button>
    </form>
  )
}
