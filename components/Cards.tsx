import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Fragment } from "react"


import { CurrencyDollarSimple, FileXls } from "@phosphor-icons/react";

const Cards = () => {
    return (
        <Fragment>
            <div className=" sx:col-span-12 sm:col-span-12 md:col-span-6  lg:col-span-6 xl:col-span-6 2xl:col-span-6 col-span-12">
                <Card className=" p-5 rounded-3xl shadow-2xl">
                    <CardHeader className="pb-0 pt-2 px-4 flex-row flex-wrap-reverse justify-between items-center text-lg font-bold">
                        <h1 className="text-2xl font-bold">Hey Felipe,<br />
                            Descarga el ultimo reporte
                        </h1>
                        <Button size="lg" isIconOnly className=" rounded-full  bg-green-700 text-white">
                            <FileXls />
                        </Button>

                    </CardHeader>
                    <CardBody>
                        <Button color="primary">
                            Descargar
                        </Button>
                    </CardBody>
                </Card>
            </div>

            <div className=" sx:col-span-12 sm:col-span-12 md:col-span-6  lg:col-span-3 xl:col-span-3 2xl:col-span-3 col-span-12">
                <Card className="bg-secondary text-white p-5 rounded-3xl shadow-2xl">
                    <CardHeader className="pb-0 pt-2 px-4 flex-row flex-wrap justify-between items-center text-lg font-bold">
                        <p>Ganancias</p>
                        <Button isIconOnly className="bg-white rounded-full p-3">
                            <CurrencyDollarSimple size={32} />
                        </Button>

                    </CardHeader>
                    <CardBody>
                        <h1 className="text-2xl font-bold">$105,350</h1>
                        <h6 className="font-bold">Mes actual</h6>
                    </CardBody>
                </Card>
            </div>
            <div className=" sx:col-span-12 sm:col-span-12 md:col-span-6  lg:col-span-3 xl:col-span-3 2xl:col-span-3 col-span-12">
                <Card className="bg-secondary text-white p-5 rounded-3xl shadow-2xl">
                    <CardHeader className="pb-0 pt-2 px-4 flex-row flex-wrap justify-between items-center text-lg font-bold">
                        <p>Ganancias</p>
                        <Button isIconOnly className="bg-white rounded-full p-3">
                            <CurrencyDollarSimple size={32} />
                        </Button>

                    </CardHeader>
                    <CardBody>
                        <h1 className="text-2xl font-bold">$105,350</h1>
                        <h6 className="font-bold">Mes actual</h6>
                    </CardBody>
                </Card>
            </div>
        </Fragment>
    )
}

export default Cards