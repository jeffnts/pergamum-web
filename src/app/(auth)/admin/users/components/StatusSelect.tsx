'use client'

import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select'
import { updateStatus } from 'actions/status'

type Status = {
  id: string
  name: string
  description: string
}

type Props = {
  userId: string
  userStatusId: string
  status: Status[]
  className?: string
}

export function StatusSelect(props: Props) {
  const { userId, userStatusId, status, className } = props
  return (
    <Select
      onValueChange={(statusId) => updateStatus(userId, statusId)}
      defaultValue={userStatusId}
    >
      <SelectTrigger className={className || 'w-[180px]'}>
        <SelectValue placeholder="Selecione o Status" />
      </SelectTrigger>
      <SelectContent>
        {status.map((status) => (
          <SelectItem key={status.id} value={status.id}>
            {status.description}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
