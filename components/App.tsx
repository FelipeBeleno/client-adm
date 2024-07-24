import { useSession } from "next-auth/react";
import { FC, ReactNode, useEffect } from "react"
import { SideBar } from "./SideBar";
import { Ring } from "@uiball/loaders";
import { Modal, ModalBody } from "@nextui-org/react";
import Loader from "@/public/svgs/Loader";

type Props = {
    children: ReactNode
}

const App: FC<Props> = ({ children }) => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'loading') {
            console.log('Loading session...');
        } else if (!session) {
            console.log('No session available.');
        }
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
                <Loader />
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
};

export default App