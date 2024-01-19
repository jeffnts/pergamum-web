'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import libraryIcon from 'assets/icons/library.svg'
import menuHamburguer from 'assets/icons/menu-hamburguer.svg'
import { menuItems } from 'consts/menu'

export function ToogleMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Image
        width={30}
        height={30}
        alt={`Ícone do menu da aplicação`}
        src={menuHamburguer}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      />

      <aside
        className={`${
          isOpen ? '-translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform  bg-white dark:bg-gray-800`}
      >
        <div className="flex items-center justify-start mt-8 px-6">
          <Image
            width={30}
            height={30}
            alt={`Ícone do menu da aplicação`}
            src={libraryIcon}
          />
          <span className="mx-4 text-lg font-medium text-gray-700 dark:text-gray-200">
            Pergamum
          </span>
        </div>
        <nav className="mt-10">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              className="flex items-center mt-4 py-2 px-6 hover:bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              href={item.href}
              onClick={() => setIsOpen(false)}
            >
              <Image
                width={30}
                height={30}
                alt={`Ícone do menu de ${item.name}`}
                src={item.icon}
              />
              <span className="mx-3">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  )
}
