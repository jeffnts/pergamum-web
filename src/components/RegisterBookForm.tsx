'use client'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import bookIcon from 'assets/icons/book.svg'
import { REQUIRED_FIELD } from 'consts/errors'
import { createOrUpdateBook } from 'actions/books'
import dayjs from 'dayjs'
import { useToast } from '@/components/ui/use-toast'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

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

type Props = {
  book?: registerBookSchemaFormData & {
    id: string
    imageUrl: string
    resume: string
  }
}

export function RegisterBookForm(props: Props) {
  const { book } = props

  const { push } = useRouter()

  const [resume, setResume] = useState(book?.resume)
  const [image, setImage] = useState<File | null>()
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()

  const handleChange = (value: any) => {
    setResume(value)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<registerBookSchemaFormData>({
    defaultValues: {
      title: book?.title,
      amount: book?.amount.toString() as any,
      author: book?.author,
      date: book?.date
        ? dayjs(book?.date).add(1, 'day').format('YYYY-MM-DD')
        : '',
      description: book?.description,
    },
    resolver: zodResolver(registerBookSchema),
  })

  function handleChangeImage(e: any) {
    setImage(e.target.files[0])
  }

  async function onSubmit(values: registerBookSchemaFormData) {
    setIsLoading(true)
    const { title, description, author, date, amount } = values
    const formData = new FormData()
    formData.append('id', book?.id || '')
    formData.append('file', image ?? '')
    formData.append('title', title)
    formData.append('description', description)
    formData.append('author', author)
    formData.append('date', date)
    formData.append('amount', `${amount}`)
    formData.append('resume', resume || '')
    const result: any = await createOrUpdateBook(formData)
    if (result?.error) {
      toast({
        description: result.error as any,
        variant: 'destructive',
      })
    } else {
      setImage(null)
      setResume('')
      reset()
      toast({
        description: result as any,
      })
      book?.id ? push(`/books/${book.id}`) : push('/books')
    }

    setIsLoading(false)
  }

  function getImage() {
    if (image) {
      return URL.createObjectURL(image)
    }

    if (book?.imageUrl) return book.imageUrl

    return bookIcon
  }

  return (
    <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
      <div className="md:col-span-2 lg:col-span-1">
        <Image alt="Book Cover" height="310" src={getImage()} width="550" />
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
        <Button disabled={isLoading} className="w-full" type="submit">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {book?.id ? 'Editar Livro' : 'Cadastrar Livro'}
        </Button>
      </form>
    </div>
  )
}
