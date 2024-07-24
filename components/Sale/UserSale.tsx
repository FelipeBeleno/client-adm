import { axiosInstance } from '@/config/axiosInstance';
import { SnackProps } from '@/config/snackbar';
import { ProductSelected } from '@/interfaces/product';
import { UserSaleInterface } from '@/interfaces/user-sale';
import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem } from '@nextui-org/react'
import { isAxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { enqueueSnackbar } from 'notistack';
import React, { FC, useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { ButtonPdf } from '../pdf/OrderPdf';

function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (...args: Parameters<T>) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}


type Props = {
    productsSelected: ProductSelected[],
    sumValues: () => number;
}


const UserSale: FC<Props> = ({ productsSelected, sumValues }) => {

    const { data: session } = useSession();
    const [saleSuccessFull, setSaleSuccessFull] = useState(false)
    const [codeSale, setCodeSale] = useState<string | undefined>(undefined)

    const { register, handleSubmit, control, formState: { errors }, setValue, getValues } = useForm<UserSaleInterface>({
        defaultValues: {
            name: "",
            documentType: "",
            document: "",
            email: "",
            clientId: session?.user.clientId,
            address: "",
            phone: ""

        }
    });
    const [clientStateSale, setClientStateSale] = useState<UserSaleInterface | null>(null)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setValue('document', value);
        debouncedSearch(value);
    };

    const search = async (query: string) => {

        try {



            const { data } = await axiosInstance.get(`/user-sale/${query}/${session?.user.clientId}`)

            setClientStateSale(data)

            const keysUserSale: (keyof UserSaleInterface)[] = [
                "name",
                "documentType",
                "document",
                "phone",
                "address",
                "clientId",
                "email"
            ]
            keysUserSale.forEach((key) => {
                setValue(key, data[key])
            });


        } catch (error) {

        }

    };

    const debouncedSearch = debounce(search, 1000);

    async function validateClient() {

        try {


            const { data } = await axiosInstance.get(`/user-sale/${getValues("document")}/${session?.user.clientId}`)

            setClientStateSale(data)

            return true

        } catch (error) {

            return false
        }

    }

    async function setClientSale(props: FieldValues) {

        try {

            // Validar si el cliente existe
            const clientExist = await validateClient();

            if (!clientExist) {

                // creacion de cliente para la venta

                await createUser()
            }

            await createSale()



        } catch (error) {



        }


    }

    async function createUser() {

        const { data } = await await axiosInstance.post(`/user-sale/`, getValues(), {
            headers: {
                Authorization: session?.user.token
            }
        })
        setClientStateSale(data)

    }

    async function createSale() {

        try {



            const { data } = await axiosInstance.post('sale', {
                products: productsSelected.map(p => ({
                    clientId: p.clientId,
                    name: p.name,
                    quantity: p.quantity,
                    value: p.value,
                    valueTotal: p.valueTotal,
                    productId: p._id,
                })),
                valueSale: sumValues(),
                valueSaleIva: sumValues() * 19 / 100,
                clientId: session?.user.clientId,
                userRegister: session?.user.email,
                userSale: clientStateSale?._id
            }, {
                headers: {
                    Authorization: session?.user.token
                }
            })

            setSaleSuccessFull(true)

            setCodeSale(data.codeSale)
            enqueueSnackbar(`La venta con codigo ${data.codeSale} ha sido registrada con exito.`, SnackProps('success'))

        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error?.response?.data)

                enqueueSnackbar(error.response?.data.message.toString(), SnackProps('error'))
                return
            }
            enqueueSnackbar(error?.toString(), SnackProps('error'))
        }

    }

    async function getPdf() {

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
    }

    return (
        <div className='p-5'>
            <Card>
                <CardHeader>
                    <h1>Cliente</h1>
                </CardHeader>
                <CardBody>
                    <form className="grid grid-cols-12 gap-5" onSubmit={handleSubmit(setClientSale)}>
                        <Input
                            className="xs:col-span-12 col-span-4"
                            label="Nombre"
                            isInvalid={errors.name ? true : false}
                            errorMessage={errors.name?.message}
                            placeholder="Joe Doe"
                            {...register('name', {
                                required: 'Este campo es requerido',
                                minLength: 3
                            })}
                        />


                        <Controller
                            name="documentType"
                            control={control}
                            rules={
                                {
                                    required: 'Este campo es requerido'
                                }
                            }
                            render={({ field }) => (

                                <Select
                                    isInvalid={errors.documentType ? true : false}
                                    errorMessage={errors.documentType?.message}
                                    label="Tipo de documento"
                                    placeholder="CEDULA DE CIUDADANIA"
                                    className="xs:col-span-12 col-span-4"
                                    {...field}
                                    defaultSelectedKeys={[getValues('documentType')]}
                                    selectedKeys={[getValues('documentType')]}
                                >
                                    <SelectItem value={"CEDULA DE CIUDADANIA"} key={"CEDULA DE CIUDADANIA"}>CEDULA DE CIUDADANIA </SelectItem>
                                    <SelectItem value={"CEDULA EXTRANGERIA"} key={"CEDULA EXTRANGERIA"}>CEDULA EXTRANGERIA </SelectItem>
                                    <SelectItem value={"NIT"} key={"NIT"}>NIT </SelectItem>
                                </Select>

                            )}
                        />

                        <Input
                            className="xs:col-span-12 col-span-4"
                            label="Número"
                            placeholder="1019098727"
                            type="number"
                            isInvalid={errors.document ? true : false}
                            errorMessage={errors.document?.message}
                            {...register('document', {

                                minLength: {
                                    value: 5,
                                    message: "El campo debe tener como minimo 5 carateres"
                                },
                                maxLength: {
                                    value: 12,
                                    message: "El campo debe tener como maximo 12 caracteres"
                                }
                            })}
                            onChange={handleInputChange}
                        />

                        <Input
                            className="xs:col-span-12 col-span-4"
                            label="Email"
                            placeholder="joedoe@mail.com"
                            type="text"
                            isInvalid={errors.email ? true : false}
                            errorMessage={errors.email?.message}
                            {...register('email', {
                                required: "Este campo es requerido",
                                pattern: {
                                    value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                                    message: 'El campo debe ser un email valido'
                                }
                            })}
                        />

                        <Input
                            className="xs:col-span-12 col-span-4"
                            label="Teléfono"
                            placeholder="601 6586263"
                            type="text"
                            isInvalid={errors.phone ? true : false}
                            errorMessage={errors.phone?.message}
                            {...register('phone', {
                                required: 'Este campo es requerido',
                                minLength: {
                                    value: 7,
                                    message: 'se debe tener por lo menos 7 caracteres'
                                },
                                maxLength: {
                                    value: 12,
                                    message: 'se debe tener maximo 12 caracteres'
                                },

                            })}
                        />

                        <Input
                            className="xs:col-span-12 col-span-4"
                            label="Dirección"
                            placeholder="Calle 123 # 45 67"
                            type="text"
                            isInvalid={errors.address ? true : false}
                            errorMessage={errors.address?.message}
                            {...register('address', {
                                required: 'Este campo es requerido',
                                minLength: {
                                    value: 5,
                                    message: 'se debe tener por lo menos 5 caracteres'
                                }

                            })}
                        />

                        <div className="col-span-12 flex justify-between">
                            <Button disabled={!saleSuccessFull} onClick={() => getPdf()} color='default' >Desacargar factura</Button>
                            <Button disabled={saleSuccessFull} type="submit" color="primary"> Completar orden</Button>
                        </div>


                    </form>

                </CardBody>
            </Card>
        </div>
    )
}

export default UserSale