import Link from 'next/link'
import Image from 'next/image'
import dayjs from 'dayjs'
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card } from 'components'
import { UpdateRentForm } from './components'
import { api } from 'libs/api/server'
import bookIcon from 'assets/icons/book.svg'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pergamum - Empréstimos',
}

type Book = {
  id: string
  title: string
  description: string
  imageUrl: string
  author: string
}

type Rents = {
  id: string
  createdAt: string
  updatedAt: string
  book: Book
}

export default async function RentsPage() {
  const rents: Rents[] = await api.get('/rents')

  return (
    <div className="min-w-full bg-slate-50">
      <Table className="max-sm:hidden">
        <TableHeader>
          <TableRow>
            <TableHead>Capa</TableHead>
            <TableHead>Livro</TableHead>
            <TableHead>Data do empréstimo</TableHead>
            <TableHead>Data da renovação</TableHead>
            <TableHead>Data prevista para devolução</TableHead>
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

              <TableCell>
                {dayjs(rent.createdAt).format('DD-MM-YYYY')}
              </TableCell>

              <TableCell>
                {dayjs(rent.createdAt).isSame(dayjs(rent.updatedAt))
                  ? 'Sem renovação'
                  : dayjs(rent.updatedAt).format('DD-MM-YYYY')}
              </TableCell>
              <TableCell>
                {dayjs(rent.updatedAt).add(7, 'days').format('DD-MM-YYYY')}
              </TableCell>
              <TableCell>
                <div className="flex gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button>Renovar o Empréstimo</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">
                            Renovar Empréstimo
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Tem certeza que deseja renovar o empréstimo deste
                            livro?
                          </p>
                        </div>
                        <UpdateRentForm id={rent.id} />
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/books/${rent.book.id}`}>Ver Livro</Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 md:p-6 md:hidden">
        {rents.map((rent) => (
          <Card
            key={rent.id}
            image={rent.book.imageUrl}
            values={[
              {
                title: 'Livro',
                description: rent.book.title,
              },
              {
                title: 'Data do empréstimo',
                description: dayjs(rent.createdAt).format('DD-MM-YYYY'),
              },
              {
                title: 'Data da renovação',
                description: dayjs(rent.createdAt).isSame(dayjs(rent.updatedAt))
                  ? 'Sem renovação'
                  : dayjs(rent.updatedAt).format('DD-MM-YYYY'),
              },
              {
                title: 'Data prevista para devolução',
                description: dayjs(rent.updatedAt)
                  .add(7, 'days')
                  .format('DD-MM-YYYY'),
              },
            ]}
            buttons={
              <>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="w-full">Renovar o Empréstimo</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                          Renovar Empréstimo
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Tem certeza que deseja renovar o empréstimo deste
                          livro?
                        </p>
                      </div>
                      <UpdateRentForm id={rent.id} />
                    </div>
                  </PopoverContent>
                </Popover>

                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/books/${rent.book.id}`}>Ver Livro</Link>
                </Button>
              </>
            }
          />
        ))}
      </section>
    </div>
  )
}
