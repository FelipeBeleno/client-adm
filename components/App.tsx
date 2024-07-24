import { useSession } from "next-auth/react";
import { FC, ReactNode, useEffect } from "react";
import { SideBar } from "./SideBar";
import { Ring } from "@uiball/loaders";
import { Modal, ModalBody } from "@nextui-org/react";
// import Loader from "@/public/svgs/Loader"; // Asegúrate de que este componente funcione correctamente

type Props = {
    children: ReactNode
}

const App: FC<Props> = ({ children }) => {
    const { data: session, status } = useSession();

    useEffect(() => {
        console.log('Session:', session);
        console.log('Status:', status);
    }, [session, status]);

    if (status === 'loading') {
        return (
            <div style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {/* Reemplaza temporalmente el Loader con un simple texto o componente de carga */}
                {/* <Loader /> */}
                <Ring size={40} lineWeight={5} speed={2} color="black" />
            </div>
        );
    }

    if (!session) {
        return <>{children}</>;
    }

    return (
        <SideBar>
            {children}
        </SideBar>
    );
}

export default App;
