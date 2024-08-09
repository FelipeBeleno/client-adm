import { axiosInstance } from "@/config/axiosInstance";
import { SnackProps } from "@/config/snackbar";
import { ComponentResponse } from "@/interfaces/component";
import { Product } from "@/interfaces/product";
import { loaderOff, loaderOn } from "@/redux/slices/laoderSlice";
import { Avatar, Badge, Button, ButtonGroup, Card, CardBody, Checkbox, CheckboxGroup, Input, Select, SelectItem, Textarea } from "@nextui-org/react"
import { Minus, Plus } from "@phosphor-icons/react";
import { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Controller, FieldValues, useForm } from "react-hook-form"
import { useDispatch } from "react-redux";

const FormProduct = () => {


    const dispatch = useDispatch();

    const { data: session } = useSession();

    const [components, setComponents] = useState<ComponentResponse[]>([])


    const getInfoComponents = useCallback(
        async () => {
            dispatch(loaderOn());
            const { data } = await axiosInstance.get<ComponentResponse[]>(`component/${session?.user.clientId}`);

            setComponents(data)
            dispatch(loaderOff());
        },
        [],
    );

    useEffect(() => {
        getInfoComponents();
    }, [])



    const [image, setImage] = useState<File>();

    const { register, handleSubmit, control, formState: { errors }, setValue, watch, reset } = useForm<Product>({
        defaultValues: {
            components: undefined,
            value: undefined,
            name: "",
            description: "",
            image: undefined,
            clientId: session?.user.clientId,
        }
    })

    async function onSubmit(props: FieldValues) {

        dispatch(loaderOn());
        let { image, ...rest } = props;

        try {

            const response = await axiosInstance.post('product', { ...rest, value: Number(rest.value) }, {
                headers: {
                    Authorization: session?.user.token
                }
            })

            if (response.data._id) {

                const formData = new FormData()


                formData.append('image', props['image']);
                formData.append('id', response.data._id);

                const uploadImage = await axiosInstance.post('product/image', formData, {
                    headers: {
                        Authorization: session?.user.token
                    }
                })

                if (uploadImage.data) {

                    enqueueSnackbar('Producto creado con exito', SnackProps('success'))
                    reset()
                    dispatch(loaderOff());
                    return
                } else {
                    dispatch(loaderOff());
                    throw new Error()
                }

            }

            enqueueSnackbar('Producto creado con exito', SnackProps('success'))
            dispatch(loaderOff());
            reset()

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


    async function sumValue(num: number, index: number) {


        let components = [...watch().components]

        components[index].stockRequired += num;
        setValue("components", components)


    }

    return (
        <Card>
            <CardBody>
                <form className="grid grid-cols-12 gap-5" onSubmit={handleSubmit(onSubmit)}>

                    <Input

                        className="col-span-12"
                        label="Nombre"
                        placeholder="Nombre de producto"

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
                        placeholder="Descripción del producto"
                        isInvalid={errors.description ? true : false}
                        errorMessage={errors.description?.message}
                        {...register('description', {
                            required: 'Este campo es requerido',
                            minLength: 3
                        })}
                    />


                    <Input

                        className="col-span-12"
                        label="Valor"
                        placeholder="Valor del producto"
                        type="number"

                        isInvalid={errors.value ? true : false}
                        errorMessage={errors.value?.message}
                        {...register('value', {
                            required: 'Este campo es requerido',
                            minLength: 3
                        })}
                    />

                    <div className="col-span-12">
                        <Controller
                            name="components"
                            control={control}

                            render={({ field }) => (
                                <CheckboxGroup
                                    label="Seleccione los componentes"
                                    isRequired
                                    onValueChange={v => {

                                        let valu = v.map(val => {
                                            let [vl] = components.filter(com => com._id === val);

                                            return {
                                                componentId: vl._id,
                                                name: vl.name,
                                                stockRequired: 0,
                                                image: vl.image
                                            }
                                        })

                                        setValue("components", valu)

                                    }}
                                    isInvalid={errors.components ? true : false}
                                    errorMessage={"Campo obligartorio"}
                                >
                                    {
                                        components.map((c, i) => {
                                            return <Checkbox value={c._id} key={i}>
                                                {c.name}
                                            </Checkbox>
                                        })
                                    }

                                </CheckboxGroup>
                            )}
                        />
                    </div>

                    <div className="flex gap-3 items-center">
                        {
                            watch().components
                                &&
                                watch().components.length > 0
                                ? watch().components.map((cm, i) => {

                                    return <div key={i} className="flex justify-center flex-col items-center gap-1">

                                        <Badge
                                            content={cm.stockRequired}
                                            size="sm" color="secondary"
                                            shape="rectangle"
                                        >
                                            <Avatar
                                                radius="md"
                                                src={cm.image}
                                            />
                                        </Badge>
                                        <ButtonGroup size="sm">
                                            <Button isIconOnly color="primary"
                                                onClick={() => sumValue(1, i)}
                                            ><Plus /></Button>
                                            <Button isIconOnly color="secondary">{cm.stockRequired}</Button>
                                            <Button isIconOnly color="primary"
                                                onClick={() => sumValue(-1, i)}
                                            ><Minus /></Button>
                                        </ButtonGroup>

                                    </div>
                                })
                                : null
                        }

                    </div>
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
                                label="Imagen del producto"
                                placeholder={image?.name ? image?.name : 'Seleccione su imagen'}
                            />
                        </FileUploader>
                    </div>


                    <Button type="submit" color="primary">Guardar</Button>
                </form>
            </CardBody>

        </Card>
    )
}

export default FormProduct