import { NavBar } from "../components/NavBar";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Forms</title>
        <link
          rel="stylesheet"
          href="https://bootswatch.com/4/lux/bootstrap.min.css"
        ></link>
      </Head>

      <NavBar />
      <Component {...pageProps} />

      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next {
          height: 100vh;
          display: flex;
          flex-direction: column;
        }
        div#__next > .container {
          flex-grow: 1;
        }
      `}</style>
    </>
  );
}
export default MyApp;
