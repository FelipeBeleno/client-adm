"use client"
import { axiosInstance } from '@/config/axiosInstance'
import { ProductSelected } from '@/interfaces/product'
import { Accordion, AccordionItem, Button, ButtonGroup, Card, CardBody, CardHeader, Chip, Image, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User } from '@nextui-org/react'
import { MagnifyingGlass, Minus, Plus } from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import { Fragment, useCallback, useEffect, useState } from 'react'

const SalesPage = () => {



  const columns = [
    { name: "Producto", uid: "name" },
    { name: "Cantidad", uid: "quantity" },
    { name: "Precio C/U", uid: "status" },
    { name: "Total", uid: "actions" },
  ];

  const renderCell = useCallback((product: any, columnKey: any, index: any, array: any[] | ProductSelected[]) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: product.image }}
            description={product.description}
            name={cellValue}
          >
            {product.name}
          </User>
        );
      case "quantity":
        return (

          <ButtonGroup size="sm">
            <Button isIconOnly color="primary"
              onClick={() => {
                let arr = [...array];
                console.log(arr)

                arr[index].quantity += 1
                setProductsSelected(arr);

              }}
            ><Plus /></Button>
            <Button isIconOnly color="secondary">{product.quantity}</Button>
            <Button isIconOnly color="primary"
              onClick={() => {
                let arr = [...array];
                console.log(arr)

                arr[index].quantity -= 1
                setProductsSelected(arr);

              }}
            ><Minus /></Button>
          </ButtonGroup>


        );

      default:
        return cellValue;
    }
  }, []);

  const { data: session } = useSession();

  const [products, setProducts] = useState<ProductSelected[]>([])
  const [productsSelected, setProductsSelected] = useState<ProductSelected[] | any[]>([])

  const getProducts = useCallback(
    async () => {
      const { data } = await axiosInstance.get<ProductSelected[]>(`product/${session?.user.clientId}`, {

        headers: {
          Authorization: session?.user.token

        }
      });

      let dataFinal = data.map(d => ({ ...d, selected: false, quantity: 1 }))
      setProducts(dataFinal)
    }, [],
  )

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {

    let arrCurrentId = productsSelected.map(ps => ps._id);


    let arrFinaly: ProductSelected[] | any[] = [];

    products.forEach(e => {

      if (e.selected) {
        if (arrCurrentId.includes(e._id)) {
        } else {
          arrFinaly = [...productsSelected, e]
        }
      } else {
        if (arrCurrentId.includes(e._id)) {
          arrFinaly = productsSelected.filter(ps => ps._id !== e._id)
        }
      }
    });
    setProductsSelected(arrFinaly)

  }, [products])






  return (
    <div className="col-span-12">

      <Accordion variant="splitted">
        <AccordionItem key="1" aria-label="Accordion 1" title="Productos">
          <div className='p-5'>
            <Input startContent={
              <MagnifyingGlass />
            }
              placeholder='Busca tu producto'
            />
          </div>
          <div className='grid grid-cols-12 gap-5 p-5'>

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
                    className={`py-4 col-span-3 xs:col-span-12 sm:col-span-6  md:col-span-4 lg:col-span-4 shadow-lg ${p.selected ? 'shadow-secondary' : ''} `}>
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

          </div>
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Detalle de producto">
          <div className='p-5'>


            <Table aria-label="Example table with custom cells">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>


              {
                productsSelected.length > 0
                  ? <TableBody >
                    {
                      productsSelected.map((product, i, array) => <TableRow key={product._id}>
                        {(columnKey) => <TableCell>{renderCell(product, columnKey, i, array)}</TableCell>}
                      </TableRow>
                      )
                    }
                  </TableBody>
                  : <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
              }


            </Table>
          </div>

        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          <p>hola</p>
        </AccordionItem>
      </Accordion>

    </div>
  )
}

export default SalesPage