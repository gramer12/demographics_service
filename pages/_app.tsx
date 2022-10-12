import "../styles/globals.css";
import type { AppProps } from "next/app";
import Map from "./Map";

function MyApp({ Component, pageProps }: AppProps) {
  return <Map />;
}

export default MyApp;
