import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@components/header';
import FamilyService from '@/services/FamilyService';
import { Family } from '@/types';
import { useRouter } from 'next/router';
import SingleFamilyOverview from '@components/families/familyId/SingleFamilyOverview';

const FamilyID: React.FC = () => {
    const router = useRouter();
    const {familyId} = router.query;

    const [family, setFamily] = useState<Family>();
    const [loggedInUser, setLoggedInUser] = useState<string | null>();

    const getFamilyById = async (familyid : number) => {
        const family = await FamilyService.getFamilyById(familyid);
        setFamily(family);
    };

    useEffect(() => {
        setLoggedInUser(sessionStorage.getItem("loggedInUser"));
        getFamilyById(parseInt(familyId as string));
    }, []);


    return (
        <>
            <Head>
                <title>{family?.name}</title>
            </Head>
            <main>
                <Header />
                {loggedInUser && 
                <SingleFamilyOverview family={family}></SingleFamilyOverview> || <h1>You are not authorized to view this content.</h1>}
            </main>
        </>
    );
};

export default FamilyID;