import Head from 'next/head';
import DndList from './_components/DndList';

export default function Home() {
  return (
    <div id="root">
      <Head>
        <title>DnD</title>
        <meta name="description" content="A simple DnD Kit using Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: '20px' }}>
        <DndList />
      </main>
    </div>
  );
}