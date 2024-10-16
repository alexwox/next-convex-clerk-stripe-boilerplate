'use client';

import {
  ClerkProvider,
  useAuth
} from '@clerk/nextjs'
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { PropsWithChildren } from 'react';
import { ConvexReactClient } from 'convex/react';
import { ThemeProvider } from './theme-provider';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

export function Providers({
  children,
}: PropsWithChildren
) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
      signInFallbackRedirectUrl="/"
      >
  <ConvexProviderWithClerk useAuth={useAuth} client={convex} >
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  </ConvexProviderWithClerk>
      </ClerkProvider >
    )
}