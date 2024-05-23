export { default } from "next-auth/middleware";


export const config = {
    matcher: [
        "/dashboard/:path*",
        "/clients/:path*",
        "/users/:path*",
        "/components/:path*",
        "/stock/:path*",
        "/products/:path*",
        "/sales/:path*"

    ]
}