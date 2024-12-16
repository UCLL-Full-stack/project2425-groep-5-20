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

    // This is for the switch between Family Overview and Shopping Lists
    // False => Family Overview
    // True => Shopping Lists
    const [selectedOption, setSelectedOption] = useState<boolean>(false);

    const getFamilyById = async (familyid : number) => {
        const family = await FamilyService.getFamilyById(familyid);
        setFamily(family);
    };

    useEffect(() => {
        setLoggedInUser(sessionStorage.getItem("loggedInUser"));
        getFamilyById(parseInt(familyId as string));
    }, []);

    const handleSelectedOption = (bool: boolean) => {
        if (!bool) {
            setSelectedOption(false);
        } else {
            setSelectedOption(true);
        }
    }


    return (
        <>
            <Head>
                <title>{family?.name}</title>
            </Head>
            <main>
                <Header />
                {loggedInUser && 
                <>
                <div className='selectOptionFamilyOrShoppingLists'>
                    <div onClick={() => handleSelectedOption(false)}>Family Overview</div>
                    <div onClick={() => handleSelectedOption(true)}>Shopping Lists</div>
                </div>
                <h1>Overview of {family?.name}</h1>
                <SingleFamilyOverview family={family}></SingleFamilyOverview> 
                </>
                || <h1>You are not authorized to view this content.</h1>}
            </main>
        </>
    );
};

export default FamilyID;