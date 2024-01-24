import Link from 'next/link'
import Image from 'next/image'
import { EditIcon, Trash2Icon, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { api } from 'libs/api/server'
import bookIcon from 'assets/icons/book.svg'
import { removeBook } from 'actions/books'

type Book = {
  id: string
  title: string
  description: string
  amount: number
  imageUrl: string
  author: string
}

export default async function ListBooksPage() {
  const books: Book[] = await api.get('/books')
  return (
    <div className="min-w-full bg-slate-50">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Capa</TableHead>
            <TableHead>Livro</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      alt="John Doe"
                      className="rounded-full cursor-pointer"
                      height="50"
                      src={book.imageUrl ?? bookIcon}
                      style={{
                        aspectRatio: '50/50',
                        objectFit: 'cover',
                      }}
                      width="50"
                    />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <Image
                      alt="Book Cover"
                      className="aspect-[2/3] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                      height={900}
                      src={book.imageUrl ?? bookIcon}
                      width={600}
                    />
                  </DialogContent>
                </Dialog>
              </TableCell>

              <TableCell className="font-medium">{book.title}</TableCell>

              <TableCell className="font-medium">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      {book.description.slice(0, 40)}...
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-48">{book.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>

              <TableCell>{book.amount}</TableCell>

              <TableCell>
                <div className="flex gap-4">
                  <Button asChild>
                    <Link href={`/admin/books/${book.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      Ver
                    </Link>
                  </Button>

                  <Button asChild>
                    <Link href={`/admin/books/${book.id}/edit`}>
                      <EditIcon className="mr-2 h-4 w-4" />
                      Editar
                    </Link>
                  </Button>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="destructive">
                        <Trash2Icon className="mr-2 h-4 w-4" />
                        Remover
                      </Button>
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
                            Sim. Remover
                          </Button>
                        </form>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
