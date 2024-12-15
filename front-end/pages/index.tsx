import { Inter } from "next/font/google";
import Head from "next/head"
import Header from "@components/header"
import TableOverview from "@components/home/TableOverview";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>FamList</title>
        <meta name="description" content="Exam app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main>
        <h1>Test Users</h1>
        <h2>These are the users that the lecturers can use to perform tests on our application.</h2>
        <TableOverview></TableOverview>
      </main>
    </>
  );
}
