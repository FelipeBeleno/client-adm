import { Fragment, useCallback, useEffect, useState } from 'react'
import TableDynamic from '../TableDynamic'
import { axiosInstance } from '@/config/axiosInstance'
import { Button } from '@nextui-org/react'
import { Eye } from '@phosphor-icons/react'
import { enqueueSnackbar } from 'notistack'
import { SnackProps } from '@/config/snackbar'
import { Paginate } from '@/interfaces/paginate'
import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { loaderOff, loaderOn } from '@/redux/slices/laoderSlice'

const SaleTable = () => {

    const { data: session } = useSession();


    const dispatch = useDispatch();


    const [dataTable, setDataTable] = useState({
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
            if (!session) return;

            try {
                dispatch(loaderOn());
                const { data } = await axiosInstance.get(`sale?limit=${paginate.limit}&offset=${paginate.offset}&clientId=${session?.user.clientId}`, {
                    headers: {
                        Authorization: session?.user.token
                    }
                })

                data.rows = data.rows.map((c: any) => {
                    return {
                        ...c,
                        option: () => <div style={{ display: 'flex', gap: 5 }}>
                            <Button isIconOnly color="primary" size='sm' onClick={async () => {

                                await getPdf(c.codeSale)

                            }}><Eye /></Button>
                        </div>
                    }
                })
                setDataTable(data);
                dispatch(loaderOff());
            } catch (error) {
                if (error) {
                    enqueueSnackbar(error.toString(), SnackProps('error'))
                    dispatch(loaderOff());
                }
            }
        },
        [paginate, session],
    )

    useEffect(() => {
        if (session) {
            getValues()
        }
    }, [session])

    useEffect(() => {
        getValues()
    }, [paginate])


    async function getPdf(codeSale: string) {
        dispatch(loaderOn());
        const response = await axiosInstance.post('sale/pdf', { code: codeSale }, {
            headers: {
                Authorization: session?.user.token
            },
            responseType: 'blob'
        })
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'factura.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        dispatch(loaderOff());
    }


    return (
        <Fragment>

            {
                dataTable?.columns?.length > 0
                    ?
                    <TableDynamic
                        setPaginate={setPaginate}
                        paginate={paginate}
                        columns={dataTable.columns}
                        rows={dataTable.rows}
                        key={dataTable.count}
                        count={dataTable.count}
                    />

                    : <p>Make beautiful websites regardless of your design experience.</p>

            }
        </Fragment>
    )
}

export default SaleTable