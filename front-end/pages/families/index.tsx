import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@components/header';
import FamilyService from '@/services/FamilyService';
import FamiliesOverview from '@components/families/FamiliesOverview';
import CreateFamily  from '@components/families/CreateFamily';
import { Family } from '@/types';

const Families: React.FC = () => {
    const [families, setFamilies] = useState<Array<Family>>([]);
    const [selectedFamily, setSelectedFamily] = useState<any | null>(null);
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

    const getAllFamilies = async () => {
        const families = await FamilyService.getAllFamlies();
        setFamilies(families);
    };

    useEffect(() => {
        setLoggedInUser(sessionStorage.getItem("loggedInUser"));
        getAllFamilies();
    }, []);

    const addNewFamily = (newFamily: Family) => {
        setFamilies([...families, newFamily]);
    }

    return (
        <>
            <Head>
                <title>Families</title>
            </Head>
            <main>
                <Header />
                {loggedInUser && <><h1>All Families</h1>
                {JSON.parse(loggedInUser).role != 'child' && <CreateFamily onCreatedFamily={addNewFamily} email={JSON.parse(loggedInUser).email} role={JSON.parse(loggedInUser).role}/>}
                <FamiliesOverview families={families} selectedFamily={setSelectedFamily} />
                </> || <h1>You are not authorized to access this content</h1>}
            </main>
        </>
    );
};

export default Families;