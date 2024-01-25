import Image from 'next/image'
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table'
import { Card } from 'components'
import { StatusSelect } from './components'
import { api } from 'libs/api/server'
import userIcon from 'assets/icons/user.svg'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pergamum - Admin - Gerência de Usuários',
}

type User = {
  id: string
  name: string
  email: string
  status: {
    id: string
    name: string
  }
}

type Status = {
  id: string
  name: string
  description: string
}

export default async function UsersPage() {
  const users: User[] = await api.get('/users')
  const status: Status[] = await api.get('/status')

  return (
    <div className="w-full overflow-auto">
      <Table className="max-sm:hidden">
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Image
                  alt="John Doe"
                  className="rounded-full"
                  height="50"
                  src={userIcon}
                  style={{
                    aspectRatio: '50/50',
                    objectFit: 'cover',
                  }}
                  width="50"
                />
              </TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <StatusSelect
                  userId={user.id}
                  userStatusId={user.status.id}
                  status={status}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 md:p-6 md:hidden">
        {users.map((user) => (
          <Card
            key={user.id}
            image={userIcon}
            values={[
              {
                title: 'Nome',
                description: user.name,
              },
              {
                title: 'Email',
                description: user.email,
              },
            ]}
            buttons={
              <div className="w-full flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Status</h2>
                <StatusSelect
                  className="w-full"
                  userId={user.id}
                  userStatusId={user.status.id}
                  status={status}
                />
              </div>
            }
          />
        ))}
      </section>
    </div>
  )
}
