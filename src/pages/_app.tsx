import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRef } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const queruClient = useRef(new QueryClient());
  return (
    <QueryClientProvider client={queruClient.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        <ToastContainer/>
      </Hydrate>
    </QueryClientProvider>
  );
}
