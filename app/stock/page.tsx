"use client"
import FormStock from '@/components/Stock/FormStock';
import TableDynamic from '@/components/TableDynamic';
import { axiosInstance } from '@/config/axiosInstance';
import { SnackProps } from '@/config/snackbar';
import { ResponsePaginatedDataStock, ResponsePaginatedDataStockDetail, StockComponentRowTable } from '@/interfaces/client';
import { Paginate } from '@/interfaces/paginate';
import { Button, Card, CardBody, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { Eye, Plus } from '@phosphor-icons/react';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { enqueueSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react'

const StockPage = () => {


    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [dataViewStock, setDataViewStock] = useState({
        title: '',
        componentId: '',
    })


    const [newStockForm, setNewStockForm] = useState(false);

    const { data: session } = useSession();


    const [dataTable, setDataTable] = useState<ResponsePaginatedDataStock>({
        columns: [],
        count: 0,
        rows: []
    })

    const [dataTableDetailStock, setDataTableDetailStock] = useState<ResponsePaginatedDataStockDetail>({
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
            data.rows = data.rows.map((c: StockComponentRowTable) => {
                return {
                    ...c,
                    status: c.status ? 'Activo' : 'No Activo',
                    dueDate: dayjs(c.dueDate).format('YYYY-MM-DD'),
                    option: () => <div style={{ display: 'flex', gap: 5 }}><p>hola</p>
                    </div>
                }
            })
            setDataTableDetailStock(data)

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

                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    onClick={() => {
                                        setNewStockForm(!newStockForm);
                                    }}
                                    color="primary"
                                    endContent={<Plus color='white' />}
                                > Agregar </Button>
                            </div>
                            {
                                newStockForm
                                    ? <FormStock />
                                    : null
                            }
                            {dataTableDetailStock.columns.length > 0
                                ? <TableDynamic

                                    columns={dataTableDetailStock.columns}
                                    rows={dataTableDetailStock.rows}
                                    key={dataTableDetailStock.count}
                                    count={dataTableDetailStock.count}
                                />
                                : <p>Make beautiful websites regardless of your design experience.</p>
                            }
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