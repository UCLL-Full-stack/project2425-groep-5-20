import Head from "next/head";
import Header from "@components/header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nextConfig from "../../next-i18next.config";
import { useTranslation } from "next-i18next";

export default function Home() {
  const {t} = useTranslation();
  
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, [loggedInUser]);

  return (
    <>
      <Header />
      <div className="bg-[#1F2833] min-h-screen flex flex-col items-center text-[#c5c6c7]">
        <Head>
          <title>{t("app.title")}</title>
          <meta name="description" content="A family-focused app for managing grocery lists" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center text-center px-6 py-10 w-full max-w-4xl">
          <section className="mb-10">
            <h1 className="text-5xl font-bold mb-4 text-[#66FCF1]">{t("home.welcome")}</h1>
            <p className="text-lg leading-relaxed">
              {t("home.info")}
            </p>
          </section>
          
          <section className="bg-[#0B0C10] p-8 rounded-lg shadow-lg mb-10 w-full">
            
            {!loggedInUser ? (
              <>
                <h2 className="text-3xl font-semibold mb-4 text-[#66FCF1]">{t("home.getStarted")}</h2>
                <p className="text-lg mb-6">
                  {t("home.ready")}
                </p>
                <Link href="/login">
                  <button className="bg-[#66FCF1] hover:bg-[#45A29E] text-[#0B0C10] font-bold py-3 px-6 rounded-full shadow-md transition-transform transform hover:scale-105">
                    {t("login.button.signUp")}
                  </button>
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-semibold mb-4 text-[#66FCF1]">{t("home.hello")} {JSON.parse(loggedInUser).name}</h2>
                <p className="text-lg mb-6">
                  {t("home.welcomeBack")}
                </p>
                <Link href="/families">
                  <button className="bg-[#66FCF1] hover:bg-[#45A29E] text-[#0B0C10] font-bold py-3 px-6 rounded-full shadow-md transition-transform transform hover:scale-105">
                    {t("home.goTo")}
                  </button>
                </Link>
              </>
            )}
          </section>

          <section className="bg-[#1b1e27] p-8 rounded-lg shadow-lg mb-10 w-full">
            <h2 className="text-3xl font-semibold mb-6 text-[#66FCF1]">{t("home.why")}</h2>
            <ul className="space-y-4 text-left text-lg">
              <li>📋 <strong>{t("home.collab1")}</strong> {t("home.collab2")}</li>
              <li>📱 <strong>{t("home.accessable1")}</strong> {t("home.accessable2")}</li>
              <li>🛒 <strong>{t("home.streamlined1")}</strong> {t("home.streamlined2")}</li>
              <li>🔔 <strong>{t("home.reminder1")}</strong> {t("home.reminder2")}</li>
            </ul>
            <h2 className="text-3xl font-semibold mb-4 text-[#66FCF1]">{t("home.how")}</h2>
            <ol className="text-lg space-y-3 text-left">
              <li> {t("home.step1")}</li>
              <li> {t("home.step2")}</li>
              <li> {t("home.step3")}</li>
              <li> {t("home.step4")}</li>
            </ol>
          </section>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = async(context: {locale: any}) => {
  const {locale} = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ["common"], nextI18nextConfig))
    }
  }
}
