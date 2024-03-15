import { FC, useCallback, useEffect, useState } from "react"
import { axiosInstance } from "@/config/axiosInstance"
import { useSession } from "next-auth/react";
import { Avatar, Button, Checkbox, Divider, Input, Select, SelectItem, Switch } from "@nextui-org/react";
import { Client, ResponseSelectClient } from "@/interfaces/client";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { FileUploader } from "react-drag-drop-files";
import { enqueueSnackbar } from "notistack";
import { SnackProps } from "@/config/snackbar";
import { isAxiosError } from "axios";



const FormClientEdit = () => {

    const { data: session } = useSession();

    const { register, handleSubmit, control, formState: { errors }, setValue, reset } = useForm<Client>({

        defaultValues: {
            address: "",
            document: "",
            documentType: "",
            email: "",
            image: undefined,
            isSubscription: false,
            name: "",
            package: "",
            payDay: undefined,
            payRate: undefined,
            phone: "",
            status: false

        }
    })

    const [image, setImage] = useState<File>()


    const [clientes, setClientes] = useState<ResponseSelectClient[]>([])

    const [clientSelected, setClientSelected] = useState<ResponseSelectClient>()
    const [clientUpdate, setClientUpdate] = useState<Client>()

    const getData = useCallback(
        async () => {

            const { data } = await axiosInstance.get<ResponseSelectClient[]>('client/select', {
                headers: {
                    Authorization: session?.user.token
                }
            });
            setClientes(data)
        },
        [],
    )

    const getDataWithId = useCallback(
        async () => {
            const { data } = await axiosInstance.get(`client/${clientSelected?._id}`, {
                headers: {
                    Authorization: session?.user.token
                }
            });

            Object.keys(data).forEach((element: any) => {
                setValue(element, data[element]);
            });

            setClientUpdate(data)

        },
        [clientSelected],
    )



    useEffect(() => {
        getData()
    }, [])


    useEffect(() => {
        if (!clientSelected) return
        getDataWithId()
    }, [clientSelected])


    async function onSubmit(data: FieldValues) {
        let { image, ...rest } = data;

        try {
            if (typeof rest["payDay"] || rest["payRate"]) {
                rest["payDay"] = Number(rest["payDay"])
                rest["payRate"] = Number(rest["payRate"])
            }

            console.log(typeof image)


            const response = await axiosInstance.post(`client/${clientSelected?._id}`, rest, {
                headers: {

                    Authorization: session?.user.token
                }
            });

            if (response.data._id) {

                if (typeof image === "string") {
                    enqueueSnackbar('Cliente editado con exito', SnackProps('success'))
                    return
                }
                const formData = new FormData()
                formData.append('image', data['image']);
                formData.append('id', response.data._id);
                const uploadImage = await axiosInstance.post('client/image', formData, {
                    headers: {
                        Authorization: session?.user.token
                    }
                })
                if (uploadImage.data) {

                    enqueueSnackbar('Cliente editado con exito', SnackProps('success'))
                    return
                } else {
                    throw new Error()
                }


            }

        } catch (error) {
            if (isAxiosError(error)) {

                enqueueSnackbar(error.response?.data.message, SnackProps('error'))
                return
            }

            enqueueSnackbar(error?.toString(), SnackProps('error'))
        }
    }



    return (
        <div>
            <Select
                className="max-w-xs xs:w-full"
                label="Seleccione el cliente"
                onChange={e => {
                    setClientUpdate(undefined);
                    let [cl] = clientes.filter(c => c._id === e.target.value)
                    setClientSelected(cl)
                }}
            >
                {
                    clientes.map((c) => {
                        return <SelectItem
                            key={c._id}
                            value={c._id}
                            startContent={<Avatar
                                isBordered radius="sm"
                                alt="imagen" className="w-6 h-6"
                                src={c.image}
                            />}
                        >
                            {c.name}
                        </SelectItem>
                    })
                }

            </Select>
            <Divider className="my-5" />
            {
                clientUpdate
                    ? <form className="grid grid-cols-12 gap-5" onSubmit={handleSubmit(onSubmit)}>


                        <Input
                            className="xs:col-span-12 col-span-4"
                            label="Nombre"
                            isInvalid={errors.name ? true : false}
                            errorMessage={errors.name?.message}
                            placeholder="Joe Doe"
                            {...register('name', {
                                required: 'Este campo es requerido',
                                minLength: 3,
                            })}
                            defaultValue={clientUpdate.name}
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
                                    label="Seleccione el tipo de documento"
                                    placeholder="NIT"
                                    className="xs:col-span-12 col-span-4"
                                    {...field}
                                    defaultSelectedKeys={[clientUpdate.documentType]}
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
                                required: "Este campo es requerido",
                                minLength: {
                                    value: 5,
                                    message: "El campo debe tener como minimo 5 carateres"
                                },
                                maxLength: {
                                    value: 12,
                                    message: "El campo debe tener como maximo 12 caracteres"
                                }
                            })}
                            defaultValue={clientUpdate.document}
                        />


                        <Input
                            className="xs:col-span-12 col-span-4"
                            label="Día de pago"
                            placeholder="16"
                            type="number"
                            isInvalid={errors.payDay ? true : false}
                            errorMessage={errors.payDay?.message}
                            {...register('payDay', {
                                required: "Este campo es requerido",
                                max: {
                                    value: 30,
                                    message: "El campo no puede ser mayor a 30"
                                },
                                min: {
                                    value: 1,
                                    message: "El campo no puede ser menor a 1"
                                },
                                minLength: {
                                    value: 1,
                                    message: "El campo debe tener como minimo 1 carater"
                                },
                                maxLength: {
                                    value: 2,
                                    message: "El campo debe tener como maximo 2 caracteres"
                                }
                            })}
                            defaultValue={clientUpdate.payDay.toString()}
                        />



                        <Controller
                            name="package"
                            control={control}
                            rules={
                                {
                                    required: 'Este campo es requerido'
                                }
                            }
                            render={({ field }) => (

                                <Select
                                    isInvalid={errors.package ? true : false}
                                    errorMessage={errors.package?.message}
                                    label="Paquete"
                                    placeholder="Basic"
                                    className="xs:col-span-12 col-span-4"
                                    {...field}
                                    defaultSelectedKeys={[clientUpdate.package]}
                                >
                                    <SelectItem value={"BASIC"} key={"BASIC"}>BASIC </SelectItem>
                                    <SelectItem value={"INTERMEDIATE"} key={"INTERMEDIATE"}>INTERMEDIATE </SelectItem>
                                    <SelectItem value={"ADVANCED"} key={"ADVANCED"}>ADVANCED </SelectItem>

                                </Select>

                            )}


                        />


                        <Input
                            className="xs:col-span-12 col-span-4"
                            label="Valor pago"
                            placeholder="0"
                            type="number"
                            isInvalid={errors.payRate ? true : false}
                            errorMessage={errors.payRate?.message}
                            {...register('payRate', {
                                required: 'El campo es requerido',
                                minLength: {
                                    value: 1,
                                    message: 'se debe tener por lo menos un caracter'
                                },
                                maxLength: {
                                    value: 6,
                                    message: 'se debe tener maximo 6 caracteres'
                                },
                                min: {
                                    value: 1,
                                    message: 'El valor debe ser mayor a 1'
                                },
                                max: {
                                    value: 100000,
                                    message: 'El valor debe ser menor a 100000'
                                }
                            })}
                            defaultValue={clientUpdate.payRate.toString()}
                        />

                        <div className="xs:col-span-12 col-span-4">
                            <FileUploader
                                classes={{
                                    "drop_area": "bg-black"
                                }}
                                handleChange={(e: File) => {

                                    setImage(e)
                                    setValue("image", e)
                                }}
                                name="image"
                                types={["jpeg", "png", "jpg"]}

                            >
                                <Input
                                    label="Imagen de empresa"
                                    placeholder={image?.name ? image?.name : clientUpdate.image}
                                />
                            </FileUploader>
                        </div>


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
                            defaultValue={clientUpdate.email}
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
                            defaultValue={clientUpdate.phone}
                        />


                        <Input
                            className="xs:col-span-12 col-span-4"
                            label="Dirección"
                            placeholder="Calle 123 # 56 - 78"
                            type="text"
                            isInvalid={errors.address ? true : false}
                            errorMessage={errors.address?.message}
                            {...register('address', {
                                required: 'Este campo es requerido',
                                minLength: {
                                    value: 6,
                                    message: 'se debe tener por lo menos 6 caracteres'
                                }

                            })}
                            defaultValue={clientUpdate.address}
                        />

                        <div className="xs:col-span-12 col-span-4">
                            <Controller
                                name="isSubscription"
                                control={control}
                                defaultValue={clientUpdate.isSubscription}
                                render={({ field }) => (
                                    //@ts-ignore
                                    <Checkbox {...field}
                                        defaultSelected={clientUpdate.isSubscription}
                                    >
                                        Subscripción
                                    </Checkbox>
                                )}
                            />
                        </div>

                        <div className="xs:col-span-12 col-span-4">
                            <Controller
                                name="status"
                                control={control}
                                defaultValue={clientUpdate.status}
                                render={({ field }) => (
                                    //@ts-ignore
                                    <Switch {...field}
                                        defaultSelected={clientUpdate.status}

                                    >
                                        Estado
                                    </Switch>
                                )}
                            />
                        </div>

                        <Button className="col-span-12" type="submit" color="primary"> Enviar</Button>

                    </form>
                    : null
            }

        </div>
    )
}

export default FormClientEdit