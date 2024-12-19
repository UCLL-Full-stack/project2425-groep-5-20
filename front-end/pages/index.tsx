import { Inter } from "next/font/google";
import Head from "next/head"
import Header from "@components/header"
import TableOverview from "@components/home/TableOverview";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';

const inter = Inter({ subsets: ["latin"] });

const Home: React.FC = () => {
  const {t} = useTranslation();
  return (
    <>
      <Head>
        <title>{t("app.title")}</title>
        <meta name="description" content="Exam app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main>
        <h1>{t("home.testUsers")}</h1>
        <h2>{t("home.testUsersExplained")}</h2>
        <TableOverview></TableOverview>
      </main>
    </>
  );
}

export const getServerSideProps = async (content: { locale: any; }) => {
  const { locale } = content;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'], nextI18NextConfig)),
    },
  };
};

export default Home;
