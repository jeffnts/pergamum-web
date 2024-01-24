import Image from 'next/image'
import { CardContent, Card } from '@/components/ui/card'
import Link from 'next/link'
import { menuItems } from 'consts/menu'

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {menuItems
        .find(({ href }) => href === '/admin')
        ?.items?.map((item) => (
          <Link key={item.name} className="group" href={item.href}>
            <Card className="transition-all hover:shadow-lg">
              <CardContent className="flex flex-col items-center space-y-2 ">
                <Image
                  width={200}
                  height={200}
                  alt={`Ícone do ${item.name}`}
                  src={item.icon}
                  className="h-8 w-8 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-50 mt-8"
                />
                <h3 className="text-lg font-semibold group-hover:text-gray-900 dark:group-hover:text-gray-50">
                  {item.name}
                </h3>
                <p className="text-sm text-center text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-50">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
    </div>
  )
}
