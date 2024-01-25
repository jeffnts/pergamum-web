import Image from 'next/image'
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
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ReturnRentForm } from './components'
import dayjs from 'dayjs'
import { api } from 'libs/api/server'
import bookIcon from 'assets/icons/book.svg'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pergamum - Admin - Gerência de Empréstimos',
}
export interface Rent {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: any
  user: User
  book: Book
}

export interface User {
  name: string
}

export interface Book {
  id: string
  title: string
  description: string
  author: string
  imageUrl: string
}

export default async function AdminRentsPage() {
  const rents: Rent[] = await api.get('/rents/list-all')

  return (
    <div className="min-w-full bg-slate-50">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Capa</TableHead>
            <TableHead>Livro</TableHead>
            <TableHead>Aluno</TableHead>
            <TableHead>Data do Empréstimo</TableHead>
            <TableHead>Data da Devolução</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rents.map((rent) => (
            <TableRow key={rent.id}>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      alt="John Doe"
                      className="rounded-full cursor-pointer"
                      height="50"
                      src={rent.book.imageUrl ?? bookIcon}
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
                      src={rent.book.imageUrl ?? bookIcon}
                      width={600}
                    />
                  </DialogContent>
                </Dialog>
              </TableCell>

              <TableCell className="font-medium">{rent.book.title}</TableCell>

              <TableCell className="font-medium">{rent.user.name}</TableCell>

              <TableCell className="font-medium">
                {dayjs(rent.createdAt).format('DD-MM-YYYY')}
              </TableCell>

              <TableCell className="font-medium">
                {rent.deletedAt
                  ? dayjs(rent.deletedAt).format('DD-MM-YYYY')
                  : 'Não devolvido ainda'}
              </TableCell>

              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button>Realizar Devolução</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                          Ralizar Devolução
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Tem certeza que deseja devolver este livro?
                        </p>
                      </div>
                      <ReturnRentForm id={rent.id} />
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
