import { axiosInstance } from "@/config/axiosInstance";
import { SnackProps } from "@/config/snackbar";
import { StockComponentRowTable } from "@/interfaces/client";
import { parseDate } from "@internationalized/date";
import { Button, DatePicker, Input } from "@nextui-org/react";
import { FloppyDiskBack } from "@phosphor-icons/react";
import { isAxiosError } from "axios";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { FC } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";


type Props = {
    stockData: StockComponentRowTable,
    onOpenChange: (isOpen: boolean) => void;
    getValues: () => void;
}

export const FormEditStock: FC<Props> = ({ stockData, onOpenChange, getValues }) => {

    const { data: session } = useSession();

    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
        defaultValues: {
            dueDate: stockData.dueDate,
            stock: stockData.stock,
            value: stockData.value
        }
    });



    async function onSubmit(props: FieldValues) {

        let formData = {
            stock: Number(props.stock),
            value: Number(props.value),
            dueDate: props.dueDate,
            clientId: session?.user.clientId,

        }



        try {

            const response = await axiosInstance.patch(`stock/${stockData.key}`, formData, {
                headers: {
                    Authorization: session?.user.token
                }
            })

            await getValues()
            enqueueSnackbar(response.data, SnackProps('success'));
            onOpenChange(false)
        }

        catch (error) {
            if (isAxiosError(error)) {

                enqueueSnackbar(error.response?.data.message.toString(), SnackProps("error"));

            }
        }

    }


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='grid grid-cols-12 gap-5'>

            <Input
                className="xs:col-span-12 col-span-4"
                label="Stock"
                isInvalid={errors.stock ? true : false}
                errorMessage={errors.stock?.message}
                placeholder="0"
                {...register('stock', {
                    required: 'Este campo es requerido',
                    min: 1
                })}
            />

            <Input
                className="xs:col-span-12 col-span-4"
                label="Valor"
                isInvalid={errors.value ? true : false}
                errorMessage={errors.value?.message}
                placeholder="0"
                {...register('value', {
                    required: 'Este campo es requerido',
                    min: 1
                })}
            />

            <Controller
                name='dueDate'
                rules={{
                    required: true
                }}
                control={control}
                render={({ field }) => (
                    <DatePicker
                        onChange={(date) => {

                            field.onChange(new Date(date.toString()))
                        }}
                        defaultValue={parseDate(
                            stockData.dueDate
                                ?
                                dayjs(stockData.dueDate).format("YYYY-MM-DD")
                                : Date().toString()
                        )}
                        isRequired
                        errorMessage={errors.value?.message}
                        className="xs:col-span-12 col-span-4"
                        label="Fecha de vencimiento"
                        isInvalid={errors.dueDate ? true : false}

                    />
                )}
            />
            <Button

                type='submit'
                className="xs:col-span-12 col-span-4"
                color='primary' endContent={<FloppyDiskBack />}> Guardar</Button>
        </form>
    )
}
