"use client";
import ButtonAuth from "@/components/ButtonAuth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <ButtonAuth />
    </Fragment>
  );
}
