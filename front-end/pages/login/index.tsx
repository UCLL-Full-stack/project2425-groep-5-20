import Header from "@components/header";
import Head from "next/head";
import LoginPage from "@components/login/LoginPage";
import TableOverview from "@components/home/TableOverview";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nextConfig from "../../../next-i18next.config";

const Login: React.FC = () => {
    const {t} = useTranslation();
    return (
        <>
        <Header/>
        <div className="bg-[#1F2833] text-white min-h-screen flex flex-col items-center justify-center">
            <Head>
                <title>{t("login.button.login")}</title>
            </Head>
            <h1 className="text-[#c5c6c7] mb-5">{t("login.button.login")}</h1>
            <main className="w-full max-w-md p-8 bg-[#0B0C10] rounded-lg shadow-md">
                <LoginPage/>
            </main>
            <div className="text-black">
                <h1 className="text-[#c5c6c7] mt-5">{t("home.testUsers")}</h1>
                <h2 className="text-[#c5c6c7] text-center mb-5" >{t("home.testUsersExplained")}</h2>
                <TableOverview></TableOverview>
            </div>
        </div>
        </>
    );
}

export const getServerSideProps = async (content: { locale: any; }) => {
  const { locale } = content;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'], nextI18nextConfig)),
    },
  };
};

export default Login;