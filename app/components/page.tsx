"use client"
import { Button, Tab, Tabs } from "@nextui-org/react"

import FormComponent from "@/components/Component/FormComponent";
import FormComponentEdit from "@/components/Component/FormComponentEdit";
import { useCallback, useEffect, useState } from "react";
import { Paginate } from "@/interfaces/paginate";
import { ResponsePaginatedData } from "@/interfaces/client";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { SnackProps } from "@/config/snackbar";
import { axiosInstance } from "@/config/axiosInstance";
import TableDynamic from "@/components/TableDynamic";
import { Trash } from "@phosphor-icons/react";

const ComponentPage = () => {


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

                const { data } = await axiosInstance.get<ResponsePaginatedData>(`component?limit=${paginate.limit}&offset=${paginate.offset}&clientId=${session?.user.clientId}`, {
                    headers: {
                        Authorization: session?.user.token
                    }
                })


                data.rows = data.rows.map(c => {

                    return {
                        ...c,
                        option: () => <Button isIconOnly color="danger"><Trash /></Button>
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
    );

    useEffect(() => {
        getData()
    }, [])




    return (
        <div className="col-span-12">
            <Tabs aria-label="Options" variant="bordered" color="primary" size="lg" classNames={{
                tabList: 'bg-white shadow xs:flex-wrap  w-full',
                base: 'w-full'
            }} >

                <Tab title="Componentes">
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

                            : null
                    }

                </Tab>

                <Tab title="Nuevo componente">
                    <FormComponent />
                </Tab>

                <Tab title="Edicion de componente">
                    <FormComponentEdit />
                </Tab>

            </Tabs>
        </div>
    )
}

export default ComponentPage;