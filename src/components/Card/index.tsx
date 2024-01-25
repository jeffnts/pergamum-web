import Image from 'next/image'
import { CardHeader, CardFooter, Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type Value = {
  title: string
  description: string
}

type Props = {
  image: string
  values?: Value[]
  buttons: React.ReactNode
}

export default function CardComponent(props: Props) {
  const { image, values, buttons } = props
  return (
    <Card>
      <Image
        alt="Product 1"
        className="object-cover w-full h-60"
        height="200"
        src={image}
        style={{
          aspectRatio: '200/200',
          objectFit: 'cover',
        }}
        width="200"
      />
      <CardHeader>
        {values?.map((value, index) => (
          <>
            <h2 key={value.title} className="text-lg font-semibold">
              {value.title}
            </h2>
            <p
              key={value.description}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {value.description}
            </p>
            {index < values.length - 1 && <Separator className="my-4" />}
          </>
        ))}
      </CardHeader>
      <CardFooter className="flex flex-col gap-6">{buttons}</CardFooter>
    </Card>
  )
}
