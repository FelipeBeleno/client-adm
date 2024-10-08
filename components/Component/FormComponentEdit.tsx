"use client"
import { Avatar, Button, Card, CardBody, Divider, Input, Select, SelectItem, Textarea } from "@nextui-org/react"
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { FieldValues, useForm } from "react-hook-form"
import { Component, ComponentResponse } from "../../interfaces/component";
import { axiosInstance } from "@/config/axiosInstance";
import { isAxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { SnackProps } from "@/config/snackbar";
import { useDispatch } from "react-redux";
import { loaderOff, loaderOn } from "@/redux/slices/laoderSlice";


const FormComponentEdit = () => {



    const dispatch = useDispatch();
    const { data: session } = useSession();

    const [image, setImage] = useState<File>();

    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm<Component>({
        defaultValues: {
            name: '',
            description: '',
            image: undefined
        }
    })


    const [components, setComponents] = useState<ComponentResponse[]>([])

    const [component, setComponent] = useState<ComponentResponse | undefined>(undefined);

    const getDataComponents = useCallback(
        async () => {
            dispatch(loaderOn());
            const { data } = await axiosInstance.get<ComponentResponse[]>(`component/${session?.user.clientId}`, {
                headers: {
                    Authorization: session?.user.token
                }
            })

            setComponents(data);
            dispatch(loaderOff());
        },
        [],
    );

    useEffect(() => {
        getDataComponents()
    }, [])



    async function onSubmit(props: FieldValues) {
        dispatch(loaderOn());
        let { image, ...rest } = props;

        try {

            const response = await axiosInstance.post(`component/${component?._id}`, rest, {
                headers: {
                    Authorization: session?.user.token
                }
            })

            if (response.data._id && typeof image !== "string") {

                const formData = new FormData()

                formData.append('image', props['image']);
                formData.append('id', response.data._id);

                const uploadImage = await axiosInstance.post('component/image', formData, {
                    headers: {
                        Authorization: session?.user.token
                    }
                })
                if (uploadImage.data) {

                    enqueueSnackbar('Componente creado con exito', SnackProps('success'))
                    dispatch(loaderOff());
                    return
                } else {
                    dispatch(loaderOff());
                    throw new Error()
                }



            }
            dispatch(loaderOff());
            enqueueSnackbar('Componente creado con exito', SnackProps('success'))

            return

        } catch (error) {
            if (isAxiosError(error)) {
                enqueueSnackbar(error.response?.data.message, SnackProps('error'))
                dispatch(loaderOff());
                return
            }
            enqueueSnackbar(error?.toString(), SnackProps('error'))
            dispatch(loaderOff());
        }
        dispatch(loaderOff());
    }

    useEffect(() => {


        if (component) {
            let keys = Object.keys(component);
            keys.forEach((u: any) => {

                //@ts-ignore
                setValue(u, component[u])
            })
        }

    }, [component])


    return (
        <Card>
            <CardBody>

                <Select
                    className="max-w-xs xs:w-full"
                    label="Seleccione el componente"
                    onChange={e => {
                        setComponent(undefined)
                        setImage(undefined)
                        setTimeout(() => {
                            const [us] = components.filter(c => c._id === e.target.value)
                            setComponent(us);
                        }, 0);
                    }}
                >

                    {
                        components.map((c) => {
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
                    component !== undefined
                        ? <form className="grid grid-cols-12 gap-5" onSubmit={handleSubmit(onSubmit)}>

                            <Input

                                className="col-span-12"
                                label="Nombre"
                                placeholder="Nombre de componente"
                                defaultValue={component.name}
                                isInvalid={errors.name ? true : false}
                                errorMessage={errors.name?.message}
                                {...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: 3
                                })}
                            />

                            <Textarea
                                className="col-span-12"
                                label="Descripción"
                                placeholder="Descripción del componente"
                                isInvalid={errors.description ? true : false}
                                defaultValue={component.description}
                                errorMessage={errors.description?.message}
                                {...register('description', {
                                    required: 'Este campo es requerido',
                                    minLength: 3
                                })}
                            />

                            <div className="col-span-12">
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
                                        label="Imagen del componente"
                                        placeholder={image?.name ? image?.name : component.image}
                                    />
                                </FileUploader>
                            </div>

                            <Button type="submit" className="col-span-12" fullWidth color="primary" >
                                Enviar
                            </Button>

                        </form>
                        : <></>
                }


            </CardBody>
        </Card>
    )
}

export default FormComponentEdit