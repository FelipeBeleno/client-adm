import { axiosInstance } from "@/config/axiosInstance";
import request, { isAxiosError } from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
    providers: [
        CredentialsProvider({

            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@mail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                try {

                    const { data } = await axiosInstance.post('auth/login', {
                        email: credentials?.email,
                        password: credentials?.password
                    });



                    return data

                } catch (error) {

                    if (isAxiosError(error)) {


                        throw new Error(error?.response?.data.message)
                    }

                }

            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token }) {

            session.user = token as any;
            return session
        },
    },
    pages: {
        signIn: "/login"
    }
});

export { handler as GET, handler as POST };