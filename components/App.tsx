import { useSession } from "next-auth/react";
import { FC, ReactNode, useEffect } from "react";
import { SideBar } from "./SideBar";
import Loader from "@/public/svgs/Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import LoaderAll from "./helpers/LoaderAll";

type Props = {
  children: ReactNode;
};

const App: FC<Props> = ({ children }) => {
  const { data: session, status } = useSession();
  const state = useSelector((state: RootState) => state.loader.state);

  if (status === "loading") {
    return <LoaderAll />;
  }
  if (!session) {
    return <>{children}</>;
  }

  return (
    <SideBar>
      {children}
      {state && <LoaderAll />}
    </SideBar>
  );
};

export default App;
