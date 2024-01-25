import { api } from 'libs/api/server'
import { RegisterBookForm } from 'components'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pergamum - Admin -  Editar Livro',
}

export default async function EditBook({ params }: { params: { id: string } }) {
  const book = await api.get(`/books/${params.id}`)
  return (
    <section className="w-full">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Editar Livro
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Edite aqui as informações do livro
            </p>
          </div>
        </div>
        <RegisterBookForm book={book as any} />
      </div>
    </section>
  )
}
