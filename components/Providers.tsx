'use client';

import { FC, ReactNode } from "react";
import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from 'notistack'
import App from "./App";

type Props = {
    children: ReactNode
}



const Providers: FC<Props> = ({ children }) => {

    return (
        <NextUIProvider>
            <SnackbarProvider>
                <SessionProvider>
                    <App>
                        {children}
                    </App>
                </SessionProvider>
            </SnackbarProvider>
        </NextUIProvider>
    )

}


export default Providers
