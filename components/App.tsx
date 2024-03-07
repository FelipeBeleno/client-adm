import { useSession } from "next-auth/react";
import { FC, ReactNode } from "react"
import { SideBar } from "./SideBar";

type Props = {
    children: ReactNode
}

const App: FC<Props> = ({ children }) => {

    const { data: session, status } = useSession();

    if (!session) {
        return <>{children}</>
    }

    return (
        <SideBar>
            {children}
        </SideBar>
    )
}

export default App