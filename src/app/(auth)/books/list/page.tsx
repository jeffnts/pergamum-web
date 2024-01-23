import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { api } from 'libs/api/server'
import bookIcon from 'assets/icons/book.svg'
import { removeBook } from 'actions/books'

type Book = {
  id: string
  title: string
  description: string
  imageUrl: string
  author: string
}

export default async function ListBooksPage() {
  const books: Book[] = await api.get('/books')
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="relative group overflow-hidden rounded-lg"
        >
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

            <div className="flex justify-between mt-4">
              <Button asChild>
                <Link href={`/books/${book.id}/edit`}>Editar</Link>
              </Button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="destructive">Remover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">
                        Remover Livro
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Tem certeza que deseja remover este livro?
                      </p>
                    </div>
                    <form action={removeBook} className="grid gap-2">
                      <input type="hidden" name="id" value={book.id} />
                      <Button type="submit" variant="destructive">
                        Sim. Remover!
                      </Button>
                    </form>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
