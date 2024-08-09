import { axiosInstance } from '@/config/axiosInstance';
import { SnackProps } from '@/config/snackbar';
import { ProductSelected } from '@/interfaces/product';
import { UserSaleInterface } from '@/interfaces/user-sale';
import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem } from '@nextui-org/react';
import { isAxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { enqueueSnackbar } from 'notistack';
import React, { FC, useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { ButtonPdf } from '../pdf/OrderPdf';
import { useDispatch } from 'react-redux';
import { loaderOff, loaderOn } from '@/redux/slices/laoderSlice';

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
};

const UserSale: FC<Props> = ({ productsSelected, sumValues }) => {
    const dispatch = useDispatch();
    const { data: session } = useSession();
    const [saleSuccessFull, setSaleSuccessFull] = useState(false);
    const [codeSale, setCodeSale] = useState<string | undefined>(undefined);
    const [clientStateSale, setClientStateSale] = useState<UserSaleInterface | null>(null);

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setValue('document', value);
        debouncedSearch(value);
    };

    const search = async (query: string) => {
        try {
            dispatch(loaderOn());
            const { data } = await axiosInstance.get(`/user-sale/${query}/${session?.user.clientId}`);
            setClientStateSale(data);

            const keysUserSale: (keyof UserSaleInterface)[] = [
                "name",
                "documentType",
                "document",
                "phone",
                "address",
                "clientId",
                "email"
            ];
            keysUserSale.forEach((key) => {
                setValue(key, data[key]);
            });

            dispatch(loaderOff());
        } catch (error) {
            dispatch(loaderOff());
        }
    };

    const debouncedSearch = debounce(search, 1000);

    async function validateClient() {
        try {
            dispatch(loaderOn());
            const { data } = await axiosInstance.get(`/user-sale/${getValues("document")}/${session?.user.clientId}`);
            setClientStateSale(data);
            dispatch(loaderOff());
            return true;
        } catch (error) {
            dispatch(loaderOff());
            return false;
        }
    }

    async function createUser() {
        try {
            dispatch(loaderOn());
            const { data } = await axiosInstance.post(`/user-sale/`, getValues(), {
                headers: {
                    Authorization: session?.user.token
                }
            });
            setClientStateSale(data);
            dispatch(loaderOff());
            return data._id;
        } catch (error) {
            dispatch(loaderOff());
        }
    }

    async function createSale() {
        try {
            dispatch(loaderOn());

            let _id = clientStateSale?._id;

            if (!_id) {
                _id = await createUser(); // Asegúrate de que createUser retorna un valor válido
            }

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
                userSale: _id,
            }, {
                headers: {
                    Authorization: session?.user.token,
                },
            });

            setSaleSuccessFull(true);
            setCodeSale(data.codeSale);
            enqueueSnackbar(`La venta con código ${data.codeSale} ha sido registrada con éxito.`, SnackProps('success'));
        } catch (error) {
            if (isAxiosError(error)) {
                enqueueSnackbar(error.response?.data.message.toString(), SnackProps('error'));
            } else {
                enqueueSnackbar(error?.toString(), SnackProps('error'));
            }
        } finally {
            dispatch(loaderOff());
        }
    }

    async function getPdf() {
        try {
            dispatch(loaderOn());
            const response = await axiosInstance.post('sale/pdf', { code: codeSale }, {
                headers: {
                    Authorization: session?.user.token
                },
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = 'factura.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            enqueueSnackbar('Error al generar el PDF.', SnackProps('error'));
        } finally {
            dispatch(loaderOff());
        }
    }

    return (
        <div className='p-5'>
            <Card>
                <CardHeader>
                    <h1>Cliente</h1>
                </CardHeader>
                <CardBody>
                    <form className="grid grid-cols-12 gap-5" onSubmit={handleSubmit(createSale)}>
                        <Input
                            className="xs:col-span-12 col-span-4"
                            label="Nombre"
                            isInvalid={!!errors.name}
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
                            rules={{
                                required: 'Este campo es requerido'
                            }}
                            render={({ field }) => (
                                <Select
                                    isInvalid={!!errors.documentType}
                                    errorMessage={errors.documentType?.message}
                                    label="Tipo de documento"
                                    placeholder="CEDULA DE CIUDADANIA"
                                    className="xs:col-span-12 col-span-4"
                                    {...field}
                                    defaultSelectedKeys={[getValues('documentType')]}
                                    selectedKeys={[getValues('documentType')]}
                                >
                                    <SelectItem key="CEDULA DE CIUDADANIA" value="CEDULA DE CIUDADANIA">CEDULA DE CIUDADANIA</SelectItem>
                                    <SelectItem key="CEDULA EXTRANGERIA" value="CEDULA EXTRANGERIA">CEDULA EXTRANGERIA</SelectItem>
                                    <SelectItem key="NIT" value="NIT">NIT</SelectItem>
                                </Select>
                            )}
                        />
                        <Input
                            className="xs:col-span-12 col-span-4"
                            label="Número"
                            placeholder="1019098727"
                            type="number"
                            isInvalid={!!errors.document}
                            errorMessage={errors.document?.message}
                            {...register('document', {
                                minLength: {
                                    value: 5,
                                    message: "El campo debe tener como mínimo 5 caracteres"
                                },
                                maxLength: {
                                    value: 12,
                                    message: "El campo debe tener como máximo 12 caracteres"
                                }
                            })}
                            onChange={handleInputChange}
                        />
                        <Input
                            className="xs:col-span-12 col-span-4"
                            label="Email"
                            placeholder="joedoe@mail.com"
                            type="text"
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message}
                            {...register('email', {
                                required: "Este campo es requerido",
                                pattern: {
                                    value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                                    message: 'El campo debe ser un email válido'
                                }
                            })}
                        />
                        <Input
                            className="xs:col-span-12 col-span-4"
                            label="Teléfono"
                            placeholder="601 6586263"
                            type="text"
                            isInvalid={!!errors.phone}
                            errorMessage={errors.phone?.message}
                            {...register('phone', {
                                required: 'Este campo es requerido',
                                minLength: {
                                    value: 7,
                                    message: 'Se deben tener por lo menos 7 caracteres'
                                },
                                maxLength: {
                                    value: 12,
                                    message: 'Se deben tener como máximo 12 caracteres'
                                }
                            })}
                        />
                        <Input
                            className="xs:col-span-12 col-span-4"
                            label="Dirección"
                            placeholder="Calle 123 # 45 67"
                            type="text"
                            isInvalid={!!errors.address}
                            errorMessage={errors.address?.message}
                            {...register('address', {
                                required: 'Este campo es requerido',
                                minLength: {
                                    value: 5,
                                    message: 'Se deben tener por lo menos 5 caracteres'
                                }
                            })}
                        />
                        <div className="col-span-12 flex justify-between">
                            <Button disabled={!saleSuccessFull} onClick={() => getPdf()} color='default'>Descargar factura</Button>
                            <Button disabled={saleSuccessFull} type="submit" color="primary">Completar orden</Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}

export default UserSale;
