"use client";

import { Button } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function ButtonAuth() {
    const { data: session, status } = useSession();


    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (session) {
        return (
            <>
                Signed in as {session.user?.email} <br />
                <Button
                    onClick={() => signOut()}

                >
                    Sign out
                </Button>
            </>
        );
    }
    return (
        <>
            Not signed in <br />
            <Button
                onClick={() => signIn()}
                color="primary"
            >
                Sign in
            </Button>
        </>
    );
}