import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Axie Mixer Playground</title>
        <meta name="description" content="A playground with a generated axie." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        Playground
      </main>
    </div>
  )
}

export default Home
