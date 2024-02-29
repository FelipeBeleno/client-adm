'use client';

import { FC, ReactNode } from "react";
import { NextUIProvider } from '@nextui-org/react'


type Props = {
    children: ReactNode
}



const Providers: FC<Props> = ({ children }) => {

    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    )

}


export default Providers
