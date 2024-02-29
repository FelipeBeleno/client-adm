"use client"
import { Avatar, Button, Card, CardBody, CardHeader, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { createElement, useState } from "react";

import { MdMenuOpen } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { ArrowBendRightDown, BellSimple, Carrot, ChartPie, Coffee, CurrencyDollarSimple, FileXls, GlobeHemisphereWest, List, MagnifyingGlass, User } from "@phosphor-icons/react";




const menus = [
    { name: "Dashboard", link: "/dashboard", icon: ChartPie },
    { name: "Usuarios", link: "/dashboard", icon: User }
];

export const SideBar = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className="flex">
            <div className={`${open ? 'xs:w-72 ' : 'w-0'} 
             ${open ? 'sm:w-72 ' : 'w-0'}
             ${open ? 'md:w-72' : 'md:w-20'} 
             ${open ? 'lg:w-72' : 'lg:w-20'}
             ${open ? 'xl:w-72' : 'xl:w-20'} 
             ${open ? '2xl:w-72' : '2xl:w-24'} 
             duration-300 h-screen bg-white shadow-2xl
            `}>


                <div className={`p-8 flex gap-x-4 ${open ? 'justify-start' : 'justify-center'} items-center`}>
                    <div className={`${open ? '' : 'xs:hidden'}`}>
                    <Coffee size={32} />


                    </div>
                    {
                        open
                        &&
                        <h1 className="origin-left font-medium text-md">Admin Template</h1>
                    }
                </div>

                <div className={`p-8 flex flex-col gap-5 gap-x-4 ${open ? 'justify-start' : 'justify-center'}  ${open ? '' : 'xs:hidden'} items-center`}>
                    {
                        menus.map((m, i) => {
                            return !open
                                ? <Button className="duration-300" key={i} isIconOnly variant="bordered" color="primary" aria-label={m.name}>
                                    {createElement(m.icon)}
                                </Button  >
                                : <Button className="duration-300" key={i} fullWidth variant="bordered" color="primary" aria-label={m.name} startContent={createElement(m.icon)}>
                                    {m.name}
                                </Button>
                        })
                    }
                </div>




            </div>

            <div className="w-full h-screen overflow-auto bg-gray-100 ">
                <div className="w-full flex flex-row justify-between items-center bg-gray-100 sticky top-0">

                    <div className="flex flex-row gap-1 justify-start items-center pt-5 pb-7">
                        <Button size="lg" onClick={() => setOpen(!open)} isIconOnly variant="light" aria-label="Like">
                            <List />
                        </Button>



                    </div>

                    <div className="flex flex-row gap-1 justify-start items-center pt-5 pb-7">

                        <Button size="md" onClick={() => setOpen(!open)} isIconOnly variant="light" aria-label="Like">
                            <GlobeHemisphereWest />

                        </Button>

                        <Button size="md" onClick={() => setOpen(!open)} isIconOnly variant="light" aria-label="Like">
                            <BellSimple />
                        </Button>

                        <Button size="md" onClick={() => setOpen(!open)} isIconOnly variant="light" aria-label="Like">
                            <MagnifyingGlass />
                        </Button>

                        <Divider style={{ height: '2.5rem' }} orientation="vertical" />

                        <div className="flex ">
                            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="md" />
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button endContent={<ArrowBendRightDown />} variant="light" >Hola,<b>Felipe</b> </Button>
                                </DropdownTrigger>

                                <DropdownMenu aria-label="Static Actions">
                                    <DropdownItem key="new">New file</DropdownItem>
                                    <DropdownItem key="copy">Copy link</DropdownItem>
                                    <DropdownItem key="edit">Edit file</DropdownItem>
                                    <DropdownItem key="delete" className="text-danger" color="danger">
                                        Delete file
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                        </div>
                    </div>


                </div>

                <div className="p-5 bg[rgb(250, 251, 251)]">

                    <div className="grid grid-cols-12 gap-5 ">

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
                    </div>

                    {/* Contenido */}

                </div>

            </div>

        </div >
    )
}
