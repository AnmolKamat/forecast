"use client";

import { client } from "@/utils/graphql";
import { ApolloProvider } from "@apollo/client";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <NextUIProvider>{children}</NextUIProvider>
    </ApolloProvider>
  );
}
