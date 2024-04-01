import { axiosInstance } from "@/config/axiosInstance";
import { SnackProps } from "@/config/snackbar";
import { ResponseSelectClient } from "@/interfaces/client";
import { User, UserResponseApi } from "@/interfaces/user";
import { Avatar, Button, Card, CardBody, Divider, Input, Select, SelectItem, Switch } from "@nextui-org/react"
import { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Controller, FieldValues, useForm } from "react-hook-form"

const FormUserEdit = () => {

    const { data: session } = useSession();

    const [users, setUsers] = useState<UserResponseApi[]>([]);
    const [user, setUser] = useState<UserResponseApi | undefined>(undefined);

    const [clientes, setClientes] = useState<ResponseSelectClient[]>([]);

    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm<User>({
        defaultValues: {
            name: "",
            documentType: "",
            document: "",
            role: "",
            email: "",
            clientId: "",
            image: "",
            status: false,
        }
    });

    const [image, setImage] = useState<File>()

    const getUsers = useCallback(
        async () => {
            const { data } = await axiosInstance.get<UserResponseApi[]>('user', {
                headers: {
                    Authorization: session?.user.token
                }
            });

            setUsers(data)
        },
        [],
    )


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

    useEffect(() => {
        getUsers()
        getData()
    }, [])

    async function onSubmit(props: FieldValues) {

        let { image, ...rest } = props;


        try {

            const response = await axiosInstance.post(`user/${user?._id}`, rest, {
                headers: {
                    Authorization: session?.user.token
                }
            })



            if (response.data._id && typeof image !== 'string') {

                const formData = new FormData()

                formData.append('image', props['image']);
                formData.append('id', response.data._id);

                const uploadImage = await axiosInstance.post('user/image', formData, {
                    headers: {
                        Authorization: session?.user.token
                    }
                })
                if (uploadImage.data) {
                    getUsers()
                    enqueueSnackbar('Usuario modificado con exito', SnackProps('success'))
                    return
                } else {
                    throw new Error()
                }


            }
            getUsers()
            enqueueSnackbar('Usuario modificado con exito', SnackProps('success'))



        } catch (error) {
            if (isAxiosError(error)) {

                enqueueSnackbar(error.response?.data.message, SnackProps('error'))
                return
            }
            enqueueSnackbar(error?.toString(), SnackProps('error'))
        }


    }

    useEffect(() => {


        if (user) {
            let keys = Object.keys(user);
            keys.forEach((u: any) => {

                //@ts-ignore
                setValue(u, user[u])
            })
        }
    }, [user])


    return (
        <Card >
            <CardBody>
                <Select
                    className="max-w-xs xs:w-full"
                    label="Seleccione el usuario"
                    onChange={e => {
                        setUser(undefined)
                        setImage(undefined)
                        setTimeout(() => {
                            const [us] = users.filter(usr => usr._id === e.target.value)
                            setUser(us);
                        }, 0);

                    }}
                >

                    {
                        users.map((u) => {
                            return <SelectItem
                                key={u._id}
                                value={u._id}
                                startContent={<Avatar
                                    isBordered radius="sm"
                                    alt="imagen" className="w-6 h-6"
                                    src={u.image}
                                />}
                            >
                                {u.name}
                            </SelectItem>
                        })
                    }

                </Select>
                <Divider className="my-5" />
                {
                    user !== undefined
                        ? <form className="grid grid-cols-12 gap-5" onSubmit={handleSubmit(onSubmit)}>

                            <Controller
                                name="clientId"
                                control={control}
                                rules={
                                    {
                                        required: 'Este campo es requerido'
                                    }
                                }
                                render={({ field }) => clientes.length > 0 ? (

                                    <Select
                                        isInvalid={errors.clientId ? true : false}
                                        errorMessage={errors.clientId?.message}
                                        label="Seleccione el cliente"
                                        className="xs:col-span-12 col-span-4"
                                        {...field}
                                        defaultSelectedKeys={[user?.clientId]}

                                    >
                                        {
                                            clientes.map((c) => {
                                                return <SelectItem
                                                    key={c._id}
                                                    value={c._id}
                                                    startContent={<Avatar
                                                        isBordered radius="sm"
                                                        alt="Brazil" className="w-6 h-6"
                                                        src={c.image}
                                                    />}
                                                >
                                                    {c.name}
                                                </SelectItem>
                                            })
                                        }



                                    </Select>

                                ) : <></>}
                            />


                            <Input
                                className="xs:col-span-12 col-span-4"
                                label="Nombre"
                                isInvalid={errors.name ? true : false}
                                errorMessage={errors.name?.message}
                                placeholder="Joe Doe"
                                defaultValue={user.name}
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
                                        placeholder="CEDULA DE CIUDADANIA"
                                        className="xs:col-span-12 col-span-4"
                                        {...field}
                                        defaultSelectedKeys={[user?.documentType]}

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
                                defaultValue={user.document}
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

                            <Controller
                                name="role"
                                control={control}
                                rules={
                                    {
                                        required: 'Este campo es requerido'
                                    }
                                }
                                render={({ field }) => (

                                    <Select
                                        isInvalid={errors.role ? true : false}
                                        errorMessage={errors.role?.message}
                                        label="Rol"
                                        placeholder="Seleccione el rol"
                                        className="xs:col-span-12 col-span-4"
                                        {...field}
                                        defaultSelectedKeys={[user?.role]}
                                    >
                                        <SelectItem value={"SUPER_ADMIN"} key={"SUPER_ADMIN"}>SUPER ADMINISTRADOR </SelectItem>
                                        <SelectItem value={"ADMIN"} key={"ADMIN"}>ADMINISTRADOR </SelectItem>
                                        <SelectItem value={"USER"} key={"USER"}>USUARIO </SelectItem>
                                    </Select>

                                )}
                            />

                            <Input
                                className="xs:col-span-12 col-span-4"
                                label="Email"
                                placeholder="joedoe@mail.com"
                                type="text"
                                isInvalid={errors.email ? true : false}
                                errorMessage={errors.email?.message}
                                defaultValue={user.email}
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
                                defaultValue={user.phone}
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
                                        label="Foto de perfil"
                                        placeholder={image?.name ? image?.name : user?.image}
                                    />
                                </FileUploader>
                            </div>

                            <div className="xs:col-span-12 col-span-4">
                                <Controller
                                    name="status"
                                    control={control}

                                    render={({ field }) => (
                                        //@ts-ignore
                                        <Switch
                                            {...field}
                                            defaultSelected={user.status}
                                        >
                                            Estado
                                        </Switch>
                                    )}
                                />
                            </div>

                            <Button className="col-span-12" type="submit" color="primary"> Enviar</Button>

                        </form>
                        : <></>
                }


            </CardBody>
        </Card >
    )
}

export default FormUserEdit