"use client"; // Ensure this runs only on the client
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient()); // Create a new QueryClient

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
