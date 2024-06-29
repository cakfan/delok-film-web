"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePost from "./post-wrapper";
import { PostWithAuthors } from "@/types/post";
import { FC } from "react";

const queryClient = new QueryClient();

interface QueryProviderProps {
  initialData: PostWithAuthors[];
}

const QueryProvider: FC<QueryProviderProps> = ({ initialData }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePost initialData={initialData} />
    </QueryClientProvider>
  );
};

export default QueryProvider;
