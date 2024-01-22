import Link from 'next/link'
import Image from 'next/image'
import { api } from 'libs/api/server'
import bookIcon from 'assets/icons/book.svg'

type Book = {
  id: string
  title: string
  description: string
  imageUrl: string
  author: string
}

export default async function BooksPage() {
  const books: Book[] = await api.get('/books')

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="relative group overflow-hidden rounded-lg"
        >
          <Link className="absolute inset-0 z-10" href={`/books/${book.id}`}>
            <span className="sr-only">View</span>
          </Link>
          <Image
            alt="Book 1"
            className="object-cover w-full h-60"
            height={300}
            src={book.imageUrl ?? bookIcon}
            style={{
              aspectRatio: '400/300',
              objectFit: 'cover',
            }}
            width={400}
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="font-semibold text-lg md:text-xl">{book.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {book.author}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {book.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  )
}
