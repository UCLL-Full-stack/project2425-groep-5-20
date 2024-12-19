import Header from "@components/header";
import Head from "next/head";
import LoginPage from "@components/login/LoginPage";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../../next-i18next.config';

const Login: React.FC = () => {
    const {t} = useTranslation();
    return (
        <>
        <Head>
            <title>{t("login.button.login")}</title>
        </Head>
        <main>
            <Header/>
            <LoginPage/>
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

export default Login;