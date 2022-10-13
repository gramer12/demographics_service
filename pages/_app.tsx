import "../styles/globals.css";
import type { AppProps } from "next/app";
import Map from "./Map";
import TinyBarChart from "../component/rechart/TinyBarChart";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div>test</div>
      {/* <TinyBarChart></TinyBarChart> */}
      <Map></Map>
      <div>test1</div>
    </>
  );
}

export default MyApp;
