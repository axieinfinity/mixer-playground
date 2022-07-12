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
          <div className={s.key}>←</div>
          <div className={s.key}>→</div>
          <span className={s.text}>to run,</span>
          <div className={s.key}>E</div>
          <span className={s.text}>to attack, and</span>
          <div className={s.key}>Space</div>
          <span className={s.text}>to jump.</span>
        </div>
      </main>
    </div>
  );
};

export default Home;
