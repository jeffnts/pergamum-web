'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import libraryIcon from 'assets/icons/library.svg'
import menuHamburguer from 'assets/icons/menu-hamburguer.svg'
import { menuItems } from 'consts/menu'

export function SideNav() {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <aside
      className={` bg-white dark:bg-gray-800 max-sm:hidden transition-all duration-500 ease-in-out w-${
        isOpen ? '64' : '28'
      }`}
    >
      <div
        className={`
        flex items-center mt-8 px-6
        ${!isOpen ? 'gap-4 justify-start' : 'justify-center mt-8'}`}
      >
        <Image
          width={30}
          height={30}
          alt={`Ícone do menu da aplicação`}
          src={libraryIcon}
        />
        <span
          className={`${
            !isOpen
              ? 'hidden'
              : 'mx-4 text-lg font-medium text-gray-700 dark:text-gray-200'
          }`}
        >
          Pergamum
        </span>

        <Image
          width={30}
          height={30}
          alt={`Ícone do menu da aplicação`}
          src={menuHamburguer}
          className="cursor-pointer"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        />
      </div>
      <nav className="mt-10">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            className="flex items-center mt-4 py-2 px-6 hover:bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            href={item.href}
          >
            <Image
              width={30}
              height={30}
              alt={`Ícone do menu de ${item.name}`}
              src={item.icon}
            />
            <span className={`${!isOpen ? 'hidden' : 'mx-3'}`}>
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
