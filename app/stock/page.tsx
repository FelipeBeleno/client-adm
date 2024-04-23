"use client"
import TableDynamic from '@/components/TableDynamic';
import { axiosInstance } from '@/config/axiosInstance';
import { SnackProps } from '@/config/snackbar';
import { ResponsePaginatedData, ResponsePaginatedDataStock } from '@/interfaces/client';
import { Paginate } from '@/interfaces/paginate';
import { Button, Card, CardBody, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { Eye, Plus } from '@phosphor-icons/react';
import { useSession } from 'next-auth/react';
import { enqueueSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react'

const StockPage = () => {


    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [dataViewStock, setDataViewStock] = useState({
        title: '',
        componentId: '',
    })


    const { data: session } = useSession();


    const [dataTable, setDataTable] = useState<ResponsePaginatedDataStock>({
        columns: [],
        count: 0,
        rows: []
    })


    const [paginate, setPaginate] = useState<Paginate>({
        limit: 5,
        offset: 0
    })


    const getValues = useCallback(
        async () => {
            //stock

            try {

                const { data } = await axiosInstance.get<ResponsePaginatedDataStock>(`stock?limit=${paginate.limit}&offset=${paginate.offset}&clientId=${session?.user.clientId}`, {
                    headers: {
                        Authorization: session?.user.token
                    }
                })

                data.rows = data.rows.map(c => {

                    return {
                        ...c,
                        option: () => <div style={{ display: 'flex', gap: 5 }}>
                            <Button isIconOnly color="primary" size='sm' onClick={() => {

                                console.log(c.key, isOpen,
                                    onOpen)

                                setDataViewStock({
                                    title: c.name,
                                    componentId: c.key
                                })
                                onOpen()
                            }}><Eye /></Button>

                        </div>
                    }
                })
                setDataTable(data);


            } catch (error) {

                if (error) {
                    enqueueSnackbar(error.toString(), SnackProps('error'))
                }
            }
        },
        [],
    )

    useEffect(() => {
        getValues()
    }, [])

    const getInfoStock = useCallback(
        async (componentId: string) => {
            const { data } = await axiosInstance.get(`stock/${componentId}`, {
                headers: {
                    Authorization: session?.user.token
                }
            })

        },
        [],
    );

    useEffect(() => {
        if (dataViewStock.componentId.length > 0) {
            getInfoStock(dataViewStock.componentId)
        }

    }, [dataViewStock])



    return (<>
        <Modal size='5xl' placement='top' isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior='inside'

        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{dataViewStock.title}</ModalHeader>
                        <ModalBody >
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nullam pulvinar risus non risus hendrerit venenatis.
                                Pellentesque sit amet hendrerit risus, sed porttitor quam.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nullam pulvinar risus non risus hendrerit venenatis.
                                Pellentesque sit amet hendrerit risus, sed porttitor quam.
                            </p>
                            <p>
                                Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                                proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                            </p>

                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nullam pulvinar risus non risus hendrerit venenatis.
                                Pellentesque sit amet hendrerit risus, sed porttitor quam.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nullam pulvinar risus non risus hendrerit venenatis.
                                Pellentesque sit amet hendrerit risus, sed porttitor quam.
                            </p>
                            <p>
                                Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                                proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                            </p>

                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nullam pulvinar risus non risus hendrerit venenatis.
                                Pellentesque sit amet hendrerit risus, sed porttitor quam.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nullam pulvinar risus non risus hendrerit venenatis.
                                Pellentesque sit amet hendrerit risus, sed porttitor quam.
                            </p>
                            <p>
                                Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                                proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Action
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
        <div className="col-span-12">

            <Card>
                <CardBody>
                    {
                        dataTable.columns.length > 0
                            ? <TableDynamic
                                setPaginate={setPaginate}
                                paginate={paginate}
                                columns={dataTable.columns}
                                rows={dataTable.rows}
                                key={dataTable.count}
                                count={dataTable.count}
                            />
                            : <p>Make beautiful websites regardless of your design experience.</p>
                    }


                </CardBody>
            </Card>

        </div>



    </>
    )
}

export default StockPage