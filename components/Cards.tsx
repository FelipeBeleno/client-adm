import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Fragment, useCallback, useEffect, useState } from "react"


import { CurrencyDollarSimple, FileXls, Hash, Star } from "@phosphor-icons/react";
import { axiosInstance } from "@/config/axiosInstance";
import { useSession } from "next-auth/react";

const Cards = () => {


    const { data: session } = useSession();

    const [valueSale, setValueSale] = useState({
        todaySale: 0,
        yesterdaySale: 0,
        monthSale: 0,
        starProductFinal: {
            name: "",
            totalQuantity: 0
        },
        coutnSales: 0,
        starProductTodayFinal: {
            name: "",
            totalQuantity: 0
        }
    })

    async function ExcelSaleToday() {

        const response = await axiosInstance.get(`dashboard/reportDay/${session?.user.clientId}`, {
            headers: {
                Authorization: session?.user.token
            },
            responseType: 'blob'
        })
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'report.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    const getSalesToday = useCallback(
        async () => {
            const response = await axiosInstance.get(`dashboard/saleToday/${session?.user.clientId}`, {
                headers: {
                    Authorization: session?.user.token
                }

            })
            setValueSale(response.data)
        },
        [session],
    )


    useEffect(() => {
        getSalesToday()
    }, [session])



    return (
        <div className="flex gap-5 w-full">
            <div className="grid grid-cols-12 gap-5 w-full">
                <div className="w-full sx:col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6 col-span-12">
                    <Card className="flex flex-col justify-between h-full p-5 rounded-3xl shadow-2xl">
                        <CardHeader className="pb-0 pt-2 px-4 flex-row flex-wrap-reverse justify-between items-center text-lg font-bold">
                            <h1 className="text-2xl font-bold">
                                Hey Felipe,
                                <br />
                                Descarga el último reporte del día.
                            </h1>
                            <Button size="lg" isIconOnly className="rounded-full bg-green-700 text-white">
                                <FileXls />
                            </Button>
                        </CardHeader>
                        <CardBody className="flex justify-end">
                            <Button onClick={() => ExcelSaleToday()} color="primary">Descargar</Button>
                        </CardBody>
                    </Card>
                </div>

                <div className="w-full sx:col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3 2xl:col-span-3 col-span-12">
                    <Card className="flex flex-col justify-between bg-secondary text-white p-5 rounded-3xl shadow-2xl h-full">
                        <CardHeader className="pb-0 pt-2 px-4 flex-row flex-wrap justify-between items-center text-lg font-bold">
                            <p>Ventas</p>
                            <Button isIconOnly className="bg-white rounded-full p-3">
                                <CurrencyDollarSimple size={32} />
                            </Button>
                        </CardHeader>
                        <CardBody className="flex justify-end">
                            <div>
                                <h1 className="text-2xl font-bold">${
                                    new Intl.NumberFormat('es-CO', { maximumSignificantDigits: 3 }).format(
                                        valueSale.todaySale,
                                    )
                                }</h1>
                                <h6 className="font-bold">Hoy</h6>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="w-full sx:col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3 2xl:col-span-3 col-span-12">
                    <Card className="flex flex-col justify-between bg-primary text-white p-5 rounded-3xl shadow-2xl h-full">
                        <CardHeader className="pb-0 pt-2 px-4 flex-row flex-wrap justify-between items-center text-lg font-bold">
                            <p>Ventas</p>
                            <Button isIconOnly className="bg-white rounded-full p-3">
                                <CurrencyDollarSimple size={32} />
                            </Button>
                        </CardHeader>
                        <CardBody className="flex justify-end">
                            <div>
                                <h1 className="text-2xl font-bold">$
                                    {
                                        new Intl.NumberFormat('es-CO', { maximumSignificantDigits: 3 }).format(
                                            valueSale.yesterdaySale,
                                        )
                                    }
                                </h1>
                                <h6 className="font-bold">Ayer</h6>
                            </div>
                        </CardBody>
                    </Card>
                </div>


                <div className="w-full sx:col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3 2xl:col-span-3 col-span-12">
                    <Card className="flex flex-col justify-between bg-secondary text-white p-5 rounded-3xl shadow-2xl h-full">
                        <CardHeader className="pb-0 pt-2 px-4 flex-row flex-wrap justify-between items-center text-lg font-bold">
                            <p>Ventas</p>
                            <Button isIconOnly className="bg-white rounded-full p-3">
                                <CurrencyDollarSimple size={32} />
                            </Button>
                        </CardHeader>
                        <CardBody className="flex justify-end">
                            <div>
                                <h1 className="text-2xl font-bold">$
                                    {
                                        new Intl.NumberFormat('es-CO', { maximumSignificantDigits: 3 }).format(
                                            valueSale.monthSale,
                                        )
                                    }
                                </h1>
                                <h6 className="font-bold">Mes actual</h6>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="w-full sx:col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3 2xl:col-span-3 col-span-12">
                    <Card className="flex flex-col justify-between bg-primary text-white p-5 rounded-3xl shadow-2xl h-full">
                        <CardHeader className="pb-0 pt-2 px-4 flex-row flex-wrap justify-between items-center text-lg font-bold">
                            <p>Mas vendido hoy</p>
                            <Button isIconOnly className="bg-white rounded-full p-3">
                                <Star size={32} />
                            </Button>
                        </CardHeader>
                        <CardBody className="flex justify-end">
                            <div>
                                <h1 className="text-2xl font-bold">
                                    {valueSale.starProductTodayFinal.totalQuantity}
                                </h1>
                                <h6 className="font-bold">{valueSale.starProductTodayFinal.name}</h6>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="w-full sx:col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3 2xl:col-span-3 col-span-12">
                    <Card className="flex flex-col justify-between bg-secondary text-white p-5 rounded-3xl shadow-2xl h-full">
                        <CardHeader className="pb-0 pt-2 px-4 flex-row flex-wrap justify-between items-center text-lg font-bold">
                            <p>Mas vendido este mes</p>
                            <Button isIconOnly className="bg-white rounded-full p-3">
                                <Star size={32} />
                            </Button>
                        </CardHeader>
                        <CardBody className="flex justify-end">
                            <div>
                                <h1 className="text-2xl font-bold">
                                    {valueSale.starProductFinal.totalQuantity}
                                </h1>
                                <h6 className="font-bold">{valueSale.starProductFinal.name}</h6>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="w-full sx:col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3 2xl:col-span-3 col-span-12">
                    <Card className="flex flex-col justify-between bg-primary text-white p-5 rounded-3xl shadow-2xl h-full">
                        <CardHeader className="pb-0 pt-2 px-4 flex-row flex-wrap justify-between items-center text-lg font-bold">
                            <p># de ventas en el mes </p>
                            <Button isIconOnly className="bg-white rounded-full p-3">
                                <Hash size={32} />
                            </Button>
                        </CardHeader>
                        <CardBody className="flex justify-end">
                            <div>
                                <h1 className="text-2xl font-bold">
                                    {valueSale.coutnSales}
                                </h1>
                                <h6 className="font-bold">Ventas realizadas</h6>
                            </div>
                        </CardBody>
                    </Card>
                </div>

            </div>


        </div>
    )
}

export default Cards