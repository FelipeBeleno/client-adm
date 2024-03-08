"use client"
import TableDynamic from "@/components/TableDynamic";
import { axiosInstance } from "@/config/axiosInstance";
import { SnackProps } from "@/config/snackbar";
import { Client } from "@/interfaces/client";
import { Tabs, Tab, Card, CardBody, Input, Button, Select, SelectItem, Switch, Checkbox } from "@nextui-org/react";
import { AxiosError, isAxiosError } from "axios";
import { File } from "buffer";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Controller, FieldValues, useForm } from "react-hook-form";



/*

phone
address
*/

const ClientPage = () => {


    const { data: session } = useSession();


    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm<Client>({
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
            phone: ""

        }
    });


    const [image, setImage] = useState<File>()

    async function onSubmit(data: FieldValues) {


        let { image, ...rest } = data;
        try {
            if (typeof rest["payDay"] || rest["payRate"]) {
                rest["payDay"] = Number(rest["payDay"])
                rest["payRate"] = Number(rest["payRate"])
            }



            const response = await axiosInstance.post('client', rest, {
                headers: {

                    Authorization: session?.user.token
                }
            });

            if (response.data._id) {

                const formData = new FormData()
                formData.append('image', data['image']);
                formData.append('id', response.data._id);
                const uploadImage = await axiosInstance.post('client/image', formData, {
                    headers: {
                        Authorization: session?.user.token
                    }
                })
                if (uploadImage.data) {

                    enqueueSnackbar('Cliente creado con exito', SnackProps('success'))
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
        <div className="col-span-12">
            <Tabs aria-label="Options" variant="bordered" color="primary" size="lg" classNames={{
                tabList: 'bg-white shadow'
            }} >
                <Tab title="Clientes">
                    <Card >
                        <CardBody>

                            <TableDynamic headers={[]} items={[]} />

                        </CardBody>
                    </Card>
                </Tab>
                <Tab title="Nuevo Cliente">
                    <Card>
                        <CardBody>
                            <form className="grid grid-cols-12 gap-5" onSubmit={handleSubmit(onSubmit)}>

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
                                            label="Seleccione el tipo de documento"
                                            placeholder="NIT"
                                            className="xs:col-span-12 col-span-4"
                                            {...field}
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
                                            placeholder={image?.name ? image?.name : 'Seleccione su imagen'}
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
                                    placeholder="Calle 123 # 56 - 78"
                                    type="text"
                                    isInvalid={errors.address ? true : false}
                                    errorMessage={errors.address?.message}
                                    {...register('address', {
                                        required: 'Este campo es requerido',
                                        minLength: {
                                            value: 6,
                                            message: 'se debe tener por lo menos 6 caracteres'
                                        },
                                    })}
                                />

                                <div className="xs:col-span-12 col-span-4">
                                    <Controller
                                        name="isSubscription"
                                        control={control}
                                        defaultValue={false}
                                        render={({ field }) => (
                                            //@ts-ignore
                                            <Checkbox {...field}>
                                                Subscripción
                                            </Checkbox>
                                        )}
                                    />
                                </div>

                                <Button className="col-span-12" type="submit" color="primary"> Enviar</Button>

                            </form>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab title="Edicion">
                    <Card>
                        <CardBody>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    )
}

export default ClientPage