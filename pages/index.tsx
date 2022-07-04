import Head from "next/head";

import { AxieFigure } from "../components/axie-figure/AxieFigureNoSsr";
import s from "./styles.module.css";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Axie Mixer Playground</title>
        <meta
          name="description"
          content="A playground where you can generate an Axie."
        />
        <link rel="icon" href="/axie.png" />
      </Head>

      <main>
        <AxieFigure />
        <div className={s.directions}>
          <p className={s.directionsText}>
            Directions: Use arrow keys to make the Axie run. Press &quot;e&quot;
            to attack. Press &quot;Space&quot; to jump!
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
