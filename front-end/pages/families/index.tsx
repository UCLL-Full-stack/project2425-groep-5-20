import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@components/header';
import FamilyService from '@/services/FamilyService';
import FamiliesOverview from '@components/families/FamiliesOverview';
import CreateFamily  from '@components/families/CreateFamily';
import { Family } from '@/types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../../next-i18next.config';

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
    }

    return (
        <>
            <Head>
                <title>{t("header.nav.families")}</title>
            </Head>
            <main>
                <Header />
                {loggedInUser && <><h1>{t("families.allFamilies")}</h1>
                {JSON.parse(loggedInUser).role != 'child' && <CreateFamily onCreatedFamily={addNewFamily} email={JSON.parse(loggedInUser).email} role={JSON.parse(loggedInUser).role}/>}
                <FamiliesOverview families={families} selectedFamily={setSelectedFamily} />
                </> || <h1>{t("login.status.noAccess")}</h1>}
            </main>
        </>
    );
};

export const getServerSideProps = async (content: { locale: any; }) => {
  const { locale } = content;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'], nextI18NextConfig)),
    },
  };
};


export default Families;