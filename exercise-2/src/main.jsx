import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./styles.css";
import UserList from "./components/UserList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="container">
        <h1>Exercise 2: User Management</h1>
        <UserList />
      </main>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")).render(<App />);
