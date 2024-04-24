import { StockComponentRowTable } from '@/interfaces/client';
import { DatePicker } from "@nextui-org/date-picker";
import { Input } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';

const FormStock = () => {

    const { data: session } = useSession();

    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm<StockComponentRowTable>({
        defaultValues: {
            dueDate: undefined,
            stock: undefined,
            value: undefined
        }
    });

    return (
        <form className='grid grid-cols-12 gap-5'>

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
                control={control}
                render={({ field }) => (
                    <DatePicker
                        errorMessage={errors.value?.message}
                        className="xs:col-span-12 col-span-4"
                        label="Birth date"
                        isInvalid={errors.dueDate ? true : false}
                        
                    />
                )}
            />





        </form>
    )
}

export default FormStock