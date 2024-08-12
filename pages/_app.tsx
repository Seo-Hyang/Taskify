import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { DashboardProvider } from "@/contexts/DashboardContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <DashboardProvider>
        <Component {...pageProps} />
      </DashboardProvider>
  );
}
