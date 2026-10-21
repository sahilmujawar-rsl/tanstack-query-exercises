import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Product from "./components/Product";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="container">
        <h1>Exercise 1: Product Listing</h1>
        <Product />
      </main>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
