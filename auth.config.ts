import type { NextAuthConfig } from 'next-auth';
import { adminEmail } from './app/lib/data';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/dashboard/admin');
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      
      if (isOnAdmin) {
        if (auth?.user && auth.user.email === adminEmail) return true;
        return false;
      } else if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;