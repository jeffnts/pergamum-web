'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import libraryIcon from 'assets/icons/library.svg'
import menuHamburguer from 'assets/icons/menu-hamburguer.svg'
import { menuItems } from 'consts/menu'

export function SideNav() {
  const [isOpen, setIsOpen] = useState(true)
  const { data }: { data: any } = useSession()

  const role = data?.user?.role

  return (
    <aside
      className={` bg-white dark:bg-gray-800 max-sm:hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'w-72' : 'w-28'
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
              : 'mx-4 text-lg font-medium text-gray-700 dark:text-gray-200 transition-all duration-500 ease-in-out'
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
        {menuItems
          .filter(({ visible }) => visible)
          .filter(({ roles }) => roles.includes(role))
          .map((item) => {
            if (item.items) {
              return (
                <Accordion
                  className="border-none"
                  key={item.name}
                  type="single"
                  collapsible
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="hover:no-underline flex items-center mt-4 py-2 px-6 hover:bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                      <Image
                        width={30}
                        height={30}
                        alt={`Ícone do menu de ${item.name}`}
                        src={item.icon}
                      />
                      <span
                        className={`${
                          !isOpen ? 'hidden' : 'mx-3'
                        } transition-all duration-500 ease-in-out`}
                      >
                        {item.name}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      {item.items
                        .filter(({ visible }) => visible)
                        .map((item) => (
                          <Link
                            key={item.name}
                            className="pl-14 flex items-center mt-4 py-2 px-6 hover:bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
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
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )
            }

            return (
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
            )
          })}
      </nav>
    </aside>
  )
}
