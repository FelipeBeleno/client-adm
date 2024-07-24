import { useSession } from "next-auth/react";
import { FC, ReactNode, useEffect } from "react";
import { SideBar } from "./SideBar";
import { Ring } from "@uiball/loaders";

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
                <Ring size={40} lineWeight={5} speed={2} color="black" />
                <p>Loading...</p>
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <div style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <p>User is not authenticated.</p>
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
