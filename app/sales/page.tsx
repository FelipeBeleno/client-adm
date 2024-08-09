"use client"
import SaleTable from '@/components/Sale/SaleTable'
import UserSale from '@/components/Sale/UserSale'
import TableDynamic from '@/components/TableDynamic'
import { axiosInstance } from '@/config/axiosInstance'
import { SnackProps } from '@/config/snackbar'
import { Paginate } from '@/interfaces/paginate'
import { ProductSelected } from '@/interfaces/product'
import { Accordion, AccordionItem, Button, ButtonGroup, Card, CardBody, CardHeader, Divider, Image, Input, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs, User } from '@nextui-org/react'
import { Eye, MagnifyingGlass, Minus, Plus } from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import { enqueueSnackbar } from 'notistack'
import { useCallback, useEffect, useState } from 'react'



const SalesPage = () => {


  const { data: session } = useSession();


  const columns = [
    { name: "Producto", uid: "name" },
    { name: "Cantidad", uid: "quantity" },
    { name: "Precio C/U", uid: "value" },
    { name: "Total", uid: "valueTotal" },
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

                arr[index].quantity += 1
                arr[index].valueTotal = arr[index].quantity * arr[index].value
                setProductsSelected(arr);

              }}
            ><Plus /></Button>
            <Button isIconOnly color="secondary">{product.quantity}</Button>
            <Button isIconOnly color="primary"
              onClick={() => {
                let arr = [...array];
                if (arr[index].quantity == 1) return
                arr[index].quantity -= 1
                arr[index].valueTotal = arr[index].quantity * arr[index].value

                setProductsSelected(arr);

              }}
            ><Minus /></Button>
          </ButtonGroup>
        );

      default:
        return cellValue;
    }
  }, []);


  const [products, setProducts] = useState<ProductSelected[]>([])
  const [productsSelected, setProductsSelected] = useState<ProductSelected[] | any[]>([])


  const getProducts = useCallback(
    async () => {
      const { data } = await axiosInstance.get<ProductSelected[]>(`product/${session?.user.clientId}`, {

        headers: {
          Authorization: session?.user.token

        }
      });

      let dataFinal = data.map(d => ({ ...d, selected: false, quantity: 1, valueTotal: d.value }))
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



  function sumValues() {
    return productsSelected.reduce((pr, cv) => {
      return pr + cv.valueTotal
    }, 0)
  }





  return (
    <div className="col-span-12">


      <Tabs aria-label="Options" variant="bordered" color="primary" size="lg" classNames={{
        tabList: 'bg-white shadow xs:flex-wrap  w-full',
        base: 'w-full'
      }} >
        <Tab title="Ventas">

          <SaleTable />

        </Tab>

        <Tab title="Nueva Venta">
          <Accordion
            variant="splitted">
            <AccordionItem key="1" aria-label="Accordion 1" title="Productos">

              {
                /*
  <div className='p-5'>
                <Input startContent={
                  <MagnifyingGlass />
                }
                  placeholder='Busca tu producto'
                />
              </div>
                */
              }
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
                        <CardBody className="overflow-visible py-2 items-center">
                          <Image
                            isZoomed
                            alt="Card background"
                            className="object-cover rounded-xl h-[300px] w-[300px]"
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
              <div className='p-5 gap-5 flex flex-col'>

                <Table removeWrapper aria-label="Example table with custom cells">
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


                <Card>
                  <CardHeader >
                    <h1>Resumen del pedido</h1>
                  </CardHeader>
                  <CardBody>
                    <div className='flex flex-col gap-3'>
                      <div className='flex flex-row justify-between'>
                        <span>Sub Total</span>
                        <span>$ {sumValues()}</span>
                      </div>
                      <Divider />

                      <div className='flex flex-row justify-between'>
                        <span>Envio</span>
                        <span>Free</span>
                      </div>
                      <Divider />

                      <div className='flex flex-row justify-between'>
                        <span>Total</span>
                        <span>$ {sumValues()}</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>

            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="Confirmación">
              <UserSale productsSelected={productsSelected} sumValues={sumValues} />
            </AccordionItem>
          </Accordion>
        </Tab>
      </Tabs>




    </div>
  )
}

export default SalesPage