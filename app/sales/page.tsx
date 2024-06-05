"use client"
import { axiosInstance } from '@/config/axiosInstance'
import { ProductSelected } from '@/interfaces/product'
import { Card, CardBody, CardHeader, Image, Input } from '@nextui-org/react'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'

const SalesPage = () => {

  const { data: session } = useSession();

  const [products, setProducts] = useState<ProductSelected[]>([])

  const getProducts = useCallback(
    async () => {
      const { data } = await axiosInstance.get<ProductSelected[]>(`product/${session?.user.clientId}`, {

        headers: {
          Authorization: session?.user.token

        }
      });

      let dataFinal = data.map(d => ({ ...d, selected: false }))
      setProducts(dataFinal)
    }, [],
  )

  useEffect(() => {
    getProducts()
  }, [])




  return (
    <div className="col-span-12">
      <Card>
        <CardHeader className='grid grid-cols-12 gap-5'>
          <div className='col-span-10'>

            <h1>Productos</h1>

          </div>

          <div className=' xs:col-span-12 col-span-2'>
            <Input startContent={
              <MagnifyingGlass />
            }
              placeholder='Busca tu producto'
            />
          </div>
        </CardHeader>
        <CardBody className='grid grid-cols-12 gap-5'>

          {
            products.length > 0
              ? products.map((p, i, arr) => {
                return <Card
                  key={i}
                  onPress={() => {

                    let arrF = [...arr];

                    arrF[i].selected = !arrF[i].selected

                    setProducts(arrF)
                  }}
                  isPressable
                  className={`py-4 col-span-3 xs:col-span-12 sm:col-span-6  md:col-span-4 lg:col-span-4 shadow-lg ${p.selected ?'shadow-secondary' :''} `}>
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">{p.name}</p>
                    <small className="text-default-500">{p.description}</small>
                    <h4 className="font-bold text-large">{p.value}</h4>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <Image
                    isZoomed
                      alt="Card background"
                      className="object-cover rounded-xl h-[300px]"
                      src={p.image?.toString()}
                      
                      
                    />
                  </CardBody>
                </Card>

              })
              : <span>No hay productos registardos</span>
          }

        </CardBody>
      </Card>

    </div>
  )
}

export default SalesPage