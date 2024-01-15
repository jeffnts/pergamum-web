'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { logout } from 'services/auth'
export function LogoutItem() {
  return (
    <DropdownMenuItem className="cursor-pointer" onClick={logout}>
      Sair
    </DropdownMenuItem>
  )
}
