import Image from 'next/image'
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { StatusSelect } from './components'
import { api } from 'libs/api/server'
import userIcon from 'assets/icons/user.svg'

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
      <Table>
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
      <div className="flex justify-center mt-4">
        <Button className="mx-2">Previous</Button>
        <Button className="mx-2">1</Button>
        <Button className="mx-2">2</Button>
        <Button className="mx-2">3</Button>
        <Button className="mx-2">Next</Button>
      </div>
    </div>
  )
}
