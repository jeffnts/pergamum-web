'use client'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ReactQuill from 'react-quill'
import { Button } from '@/components/ui/button'
import bookIcon from 'assets/icons/book.svg'
import { REQUIRED_FIELD } from 'consts/errors'
import { createBook } from 'actions/books'
import dayjs from 'dayjs'
import { useToast } from '@/components/ui/use-toast'

export function RegisterForm() {
  const [resume, setResume] = useState('')
  const [image, setImage] = useState<File | null>()

  const { toast } = useToast()

  const handleChange = (value: any) => {
    setResume(value)
  }

  const registerBookSchema = z.object({
    title: z.string().min(1, REQUIRED_FIELD),
    image: z.any().optional(),
    description: z.string().min(1, REQUIRED_FIELD),
    author: z.string().min(1, REQUIRED_FIELD),
    date: z
      .string()
      .min(1, REQUIRED_FIELD)
      .transform((date) => dayjs(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')),
    amount: z
      .string()
      .min(1, REQUIRED_FIELD)
      .transform((amount) => +amount),
  })

  type registerBookSchemaFormData = z.infer<typeof registerBookSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<registerBookSchemaFormData>({
    resolver: zodResolver(registerBookSchema),
  })

  function handleChangeImage(e: any) {
    setImage(e.target.files[0])
  }

  async function onSubmit(values: registerBookSchemaFormData) {
    try {
      const { title, description, author, date, amount } = values
      const formData = new FormData()
      formData.append('file', image ?? '')
      formData.append('title', title)
      formData.append('description', description)
      formData.append('author', author)
      formData.append('date', date)
      formData.append('amount', `${amount}`)
      const result = await createBook(formData)
      setImage(null)
      setResume('')
      reset()

      toast({
        description: result,
      })
    } catch (error) {
      console.log(error)
    }
    // mutate(values)
  }

  return (
    <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
      <div className="md:col-span-2 lg:col-span-1">
        <Image
          alt="Book Cover"
          height="310"
          src={image ? URL.createObjectURL(image) : bookIcon}
          width="550"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:col-span-2 lg:col-span-2 space-y-4"
      >
        <div className="space-y-2">
          <Input
            label="Título"
            placeholder="Digite o título do livro"
            id="title"
            {...register('title')}
            errors={errors}
          />
        </div>
        <div className="space-y-2">
          <Input
            label="Imagem de capa"
            placeholder="Selecione uma image para a capa do livro"
            id="image"
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
          />
        </div>
        <div className="space-y-2">
          <Textarea
            label="Descrição"
            placeholder="Digite uma descrição para o livro"
            id="description"
            {...register('description')}
            errors={errors}
          />
        </div>
        <div className="space-y-2">
          <Input
            label="Autor"
            placeholder="Digite o nome do autor do livro"
            id="author"
            {...register('author')}
            errors={errors}
          />
        </div>
        <div className="space-y-2">
          <Input
            label="Data de publicação"
            placeholder="Digite a data de publicação do livro"
            id="date"
            type="date"
            {...register('date')}
            errors={errors}
          />
        </div>
        <div className="space-y-2">
          <Input
            label="Quantidade disponível"
            defaultValue={1}
            placeholder="Digite a quantidade disponível"
            id="amount"
            type="number"
            {...register('amount')}
            errors={errors}
          />
        </div>
        <div className="space-y-2">
          <div>
            <label
              htmlFor="resume"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Resmo
            </label>
            <ReactQuill theme={'snow'} value={resume} onChange={handleChange} />
          </div>
        </div>
        <Button className="w-full" type="submit">
          Cadastrar Livro
        </Button>
      </form>
    </div>
  )
}
