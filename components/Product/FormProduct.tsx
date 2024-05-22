import { axiosInstance } from "@/config/axiosInstance";
import { ComponentResponse } from "@/interfaces/component";
import { Product } from "@/interfaces/product";
import { Avatar, Badge, Button, ButtonGroup, Card, CardBody, Checkbox, CheckboxGroup, Input, Select, SelectItem, Textarea } from "@nextui-org/react"
import { Minus, Plus } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Controller, FieldValues, useForm } from "react-hook-form"

const FormProduct = () => {


    const { data: session } = useSession();

    const [components, setComponents] = useState<ComponentResponse[]>([])


    const getInfoComponents = useCallback(
        async () => {

            const { data } = await axiosInstance.get<ComponentResponse[]>(`component/${session?.user.clientId}`);

            setComponents(data)

        },
        [],
    );

    useEffect(() => {
        getInfoComponents();
    }, [])



    const [image, setImage] = useState<File>();

    const { register, handleSubmit, control, formState: { errors }, setValue, watch } = useForm<Product>({
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

        console.log(props)
    }


    const [valuesComponents, setValuesComponents] = useState(new Set([]));

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
                                    errorMessage={errors.components?.message}
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

                                    return <div key={i}>
                                        <Badge
                                            content={i + 1}
                                            size="sm" color="secondary" >
                                            <Avatar
                                                radius="md"
                                                src={cm.image}
                                            />
                                        </Badge>
                                        <ButtonGroup size="sm">
                                            <Button  isIconOnly color="primary"><Plus/></Button>
                                            <Button  isIconOnly color="primary">{cm.stockRequired}</Button>
                                            <Button  isIconOnly color="primary"><Minus /></Button>
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
                                //setValue("image", e)
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


                    <Button type="submit" color="primary">Send</Button>
                </form>
            </CardBody>

        </Card>
    )
}

export default FormProduct