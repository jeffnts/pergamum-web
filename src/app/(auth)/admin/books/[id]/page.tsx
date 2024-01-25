import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { api } from 'libs/api/server'
import dayjs from 'dayjs'
import bookIcon from 'assets/icons/book.svg'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pergamum - Admin - Livro',
}

type Book = {
  id: string
  title: string
  description: string
  imageUrl: string
  date: Date
  author: string
  resume: string
  bookAvailability: { amount: number }[]
}

export default async function AdminBookPage({
  params,
}: {
  params: { id: string }
}) {
  const book: Book = await api.get(`/books/${params.id}`)

  const amount = book.bookAvailability[0].amount

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid md:grid-cols-5 gap-3 items-start">
        <div className="md:col-span-4">
          <Image
            alt="Book Cover"
            className="aspect-[2/3] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
            height={900}
            src={book.imageUrl ?? bookIcon}
            width={600}
          />
        </div>
      </div>
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="hidden md:flex items-start">
          <div className="grid gap-4">
            <h1 className="font-bold text-3xl lg:text-4xl">{book.title}</h1>
            <div>
              <p>{book.description}</p>
            </div>
          </div>
        </div>
        <form className="grid gap-4 md:gap-10">
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="author">
              {`${book.author}  - ${dayjs(book.date)
                .add(1, 'day')
                .format('DD/MM/YYYY')}`}
            </Label>

            <Label className="text-base" htmlFor="author">
              {`Quantidade disponível: ${amount}`}
            </Label>
            <div dangerouslySetInnerHTML={{ __html: book.resume }} />
          </div>
        </form>
      </div>
    </div>
  )
}
