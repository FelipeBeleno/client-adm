"use client";

import { FC, ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";
import App from "./App";
import { Provider } from "react-redux";
import store from "@/redux/store";

type Props = {
  children: ReactNode;
};

const Providers: FC<Props> = ({ children }) => {
  return (
    <NextUIProvider>
      <SnackbarProvider>
        <Provider store={store}>
          <SessionProvider>
            <App>{children}</App>
          </SessionProvider>
        </Provider>
      </SnackbarProvider>
    </NextUIProvider>
  );
};

export default Providers;
