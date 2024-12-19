import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@components/header";
import FamilyService from "@/services/FamilyService";
import FamiliesOverview from "@components/families/FamiliesOverview";
import CreateFamily from "@components/families/CreateFamily";
import { Family } from "@/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nextConfig from "../../../next-i18next.config";
import { useTranslation } from "next-i18next";

const Families: React.FC = () => {
  const {t} = useTranslation();

  const [families, setFamilies] = useState<Array<Family>>([]);
  const [selectedFamily, setSelectedFamily] = useState<any | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const getAllFamilies = async () => {
    const families = await FamilyService.getAllFamlies();
    setFamilies(families);
  };

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    getAllFamilies();
  }, []);

  const addNewFamily = (newFamily: Family) => {
    setFamilies([...families, newFamily]);
  };

  return (
    <>
      <div className="bg-[#1F2833] min-h-screen">
        <Head>
          <title>{t("header.nav.families")}</title>
        </Head>
        <main>
          <Header />
          {loggedInUser ? (
            <div className="flex flex-col items-center mt-10">
              {/* card ding wrapper div */}
              <div className="bg-[#303341] shadow-lg rounded-lg w-11/12 md:w-3/5 p-6 text-black">
                <h1 className="text-3xl font-bold text-center text-[#c5c6c7] mb-6">
                  {t("families.allFamilies")}
                </h1>

                <div className="overflow-x-auto mb-6">
                  <FamiliesOverview
                    families={families}
                    selectedFamily={setSelectedFamily}
                  />
                </div>

                {JSON.parse(loggedInUser).role !== "child" && (
                  <div className="flex justify-end mr-4">
                    <CreateFamily
                      onCreatedFamily={addNewFamily}
                      email={JSON.parse(loggedInUser).email}
                      role={JSON.parse(loggedInUser).role}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <h1 className="text-center text-[#ff0000] mt-10">
              {t("login.status.noAccess")}
            </h1>
          )}
        </main>
      </div>
    </>
  );
};

export const getServerSideProps = async (content: { locale: any; }) => {
  const { locale } = content;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'], nextI18nextConfig)),
    },
  };
};


export default Families;
