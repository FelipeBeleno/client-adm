'use client'
import { FormEvent, useState } from "react";
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios';
import { Button, Card, Input } from "@nextui-org/react";
import { SnackProps } from "@/config/snackbar";
import { enqueueSnackbar } from "notistack";


interface errorAxios {
    error: string;
    message: string;
    statusCode: number
}

function LoginPage() {

    const router = useRouter();

    const [form, setForm] = useState({
        email: 'felipe@mail.com',
        password: 'AVjesus10#'
    });

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {

        e.preventDefault();


        try {

            const res = await signIn('credentials',
                { ...form, redirect: false }
            )

            if (res?.error) {
                let arr = res?.error?.split(',')

                for (let i = 0; i < arr.length; i++) {
                    const element = arr[i];
                    enqueueSnackbar(element, SnackProps('error'))


                }

                return
            }

            router.push('/dashboard')

        } catch (error) {

            console.log(error)

            if (error instanceof AxiosError) {
                let axiosError = error as AxiosError;

                let message = axiosError.response?.data as errorAxios


            }

        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }

    return (
        <div className="w-screen bg-primary h-screen flex justify-center items-center  xs:p-5 sm:p-7 md:p-7 p-10 ">
            <Card className="p-7" >
                <h1 className="text-2xl font-black mb-7">Inicio de sesión</h1>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="flex gap-5 flex-col">
                    <div className="flex flex-col gap-2">
                        <label>Email</label>
                        <Input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            type="email" placeholder="Email" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Password</label>
                        <Input
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            type="password" placeholder="*******" />
                    </div>
                    <Button type="submit" color="primary" >Enviar</Button>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione odio iusto accusamus atque? Officia, quos? Voluptate cum explicabo dolor, excepturi deserunt sit odio earum perspiciatis aut voluptatem. Dolorum, nesciunt asperiores!</p>
                </form>
            </Card>
        </div>
    )
}
export default LoginPage