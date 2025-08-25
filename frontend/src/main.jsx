import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './providers/AuthProvider.jsx'

import {
  Routes,
  Route,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes
} from 'react-router'
import * as Sentry from '@sentry/react'
import { useEffect } from "react";
import React from 'react'


const queryClient = new QueryClient()
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

Sentry.init({
  dsn: "https://56805eb7ac8b55ba9671b19ad1a15a03@o4509723164147712.ingest.us.sentry.io/4509905860493312",
  integrations: [
    Sentry.reactRouterV7BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
  tracesSampleRate: 1.0, // ⚡ 1.0 = 100% tracing. Use lower in production
});

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
        <App />
        </AuthProvider>
        <Toaster position="top-right"/>
      </QueryClientProvider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
