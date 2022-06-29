import Head from "next/head";

import { AxieFigure } from "../components/axie-figure/AxieFigureNoSsr";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Axie Mixer Playground</title>
        <meta
          name="description"
          content="A playground with a generated axie."
        />
        <link rel="icon" href="/axie.png" />
      </Head>

      <main>
        Playground
        <AxieFigure />
      </main>
    </div>
  );
};

export default Home;
