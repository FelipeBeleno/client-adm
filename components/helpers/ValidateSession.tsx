"use client";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import LoaderAll from "./LoaderAll";

const ValidateSession = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  useEffect(() => {
    if (status === "authenticated" && pathname === "/") {
      redirect("/dashboard");
    }
  }, [status]);

  return <LoaderAll />;
};

export default ValidateSession;
