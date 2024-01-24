import Link from 'next/link'
import Image from 'next/image'
import { AvatarImage, Avatar } from '@/components/ui/avatar'
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu'
import { SideNav, LogoutItem, ToogleMenu } from './components'
import userIcon from 'assets/icons/user.svg'
import libraryIcon from 'assets/icons/library.svg'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <SideNav />

      <div className="flex flex-col flex-1">
        <header className="w-full p-4 bg-white dark:bg-gray-800 flex max-sm:justify-between justify-end items-center">
          <ToogleMenu />

          <Image
            width={30}
            height={30}
            alt={`Ícone do menu da aplicação`}
            src={libraryIcon}
            className="md:hidden"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarImage alt="Avatar" asChild />
                <Image
                  width={100}
                  height={100}
                  alt="Imagem do avatar"
                  src={userIcon}
                />
                <span className="sr-only">Toggle user menu</span>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href={'/profile'}>Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <LogoutItem />
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="p-4 flex-1 overflow-y-auto md:p-6 max-sm:pb-12">
          {children}
        </main>
      </div>
    </div>
  )
}
