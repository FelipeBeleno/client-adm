"use client"
import FormClient from "@/components/Client/FormClient";
import FormClientEdit from "@/components/Client/FormClientEdit";
import TableDynamic from "@/components/TableDynamic";
import { axiosInstance } from "@/config/axiosInstance";
import { SnackProps } from "@/config/snackbar";
import {  ResponsePaginatedData } from "@/interfaces/client";
import { Paginate } from "@/interfaces/paginate";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";



const ClientPage = () => {

    const { data: session } = useSession();


    const [dataTable, setDataTable] = useState<ResponsePaginatedData>({
        columns: [],
        count: 0,
        rows: []
    })


    const [paginate, setPaginate] = useState<Paginate>({
        limit: 5,
        offset: 0
    })



    const getData = useCallback(
        async () => {
            try {

                const { data } = await axiosInstance.get<ResponsePaginatedData>(`client?limit=${paginate.limit}&offset=${paginate.offset}`, {
                    headers: {
                        Authorization: session?.user.token
                    }
                })
                setDataTable(data);
            } catch (error) {

                if (error) {
                    enqueueSnackbar(error.toString(), SnackProps('error'))
                }
            }
        },
        [paginate],
    );

    useEffect(() => {
        getData()
    }, [paginate])


    return (
        <div className="col-span-12">
            <Tabs aria-label="Options" variant="bordered" color="primary" size="lg" classNames={{
                tabList: 'bg-white shadow xs:flex-wrap w-full',
                base:'w-full'
            }} >
                <Tab title="Clientes">
                    <Card >
                        <CardBody>
                            {
                                dataTable.columns.length > 0
                                    ?
                                    <TableDynamic
                                        setPaginate={setPaginate}
                                        paginate={paginate}
                                        columns={dataTable.columns}
                                        rows={dataTable.rows}
                                        key={dataTable.count}
                                        count={dataTable.count}
                                    />
                                    : null

                            }


                        </CardBody>
                    </Card>
                </Tab>
                <Tab title="Nuevo Cliente">
                    <Card>
                        <CardBody>
                            <FormClient />
                        </CardBody>
                    </Card>
                </Tab>
                <Tab title="Edicion">
                    <Card>
                        <CardBody>

                            <FormClientEdit />

                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    )
}

export default ClientPage