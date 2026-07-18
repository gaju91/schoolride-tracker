"use client";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";import { useState,type ReactNode } from "react";
export function Providers({children}:{children:ReactNode}){const[client]=useState(()=>new QueryClient({defaultOptions:{queries:{staleTime:5000,refetchInterval:15000}}}));return <QueryClientProvider client={client}>{children}</QueryClientProvider>}
