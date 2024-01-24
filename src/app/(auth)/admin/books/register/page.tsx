import { RegisterBookForm } from 'components'

export default function RegisterBookPage() {
  return (
    <section className="w-full">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Cadastrar Livro
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Insira aqui as informções referente ao livro
            </p>
          </div>
        </div>
        <RegisterBookForm />
      </div>
    </section>
  )
}
