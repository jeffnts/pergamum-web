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
import { Button } from '@/components/ui/button'
import { UpdateRentForm } from './components'
import { api } from 'libs/api/server'
import bookIcon from 'assets/icons/book.svg'

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Capa</TableHead>
            <TableHead>Livro</TableHead>
            <TableHead>Data do empréstimo</TableHead>
            <TableHead>Data da renovação</TableHead>
            <TableHead>Data da devolução</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rents.map((rent) => (
            <TableRow key={rent.id}>
              <TableCell>
                <Image
                  alt="John Doe"
                  className="rounded-full"
                  height="50"
                  src={rent.book.imageUrl ?? bookIcon}
                  style={{
                    aspectRatio: '50/50',
                    objectFit: 'cover',
                  }}
                  width="50"
                />
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
              </TableCell>

              <TableCell>
                <Button asChild>
                  <Link href={`/books/${rent.book.id}`}>Ver Livro</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
