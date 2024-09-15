import { NextAuthConfig } from 'next-auth';

interface AuthCallbacks {
    authorized(params: {
        auth: { user?: any }; // Ajusta el tipo de `user` según lo que esperas en tu contexto
        request: { nextUrl: URL };
    }): boolean | Response;
}

export const authConfig = {
    pages: {
        signIn: '/ui/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/ui/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/ui/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
    secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;