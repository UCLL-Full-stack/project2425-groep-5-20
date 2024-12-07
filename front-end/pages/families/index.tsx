import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@components/header';
import FamilyService from '@/services/FamilyService';
import FamiliesOverview from '@components/families/FamiliesOverview';
import SingleFamilyOverview from '@components/families/SingleFamilyOverview';
import CreateFamily  from '@components/families/CreateFamily';
import { Family } from '@/types';

const Families: React.FC = () => {
    const [families, setFamilies] = useState<Array<Family>>([]);
    const [selectedFamily, setSelectedFamily] = useState<any | null>(null);

    const getAllFamilies = async () => {
        const families = await FamilyService.getAllFamlies();
        setFamilies(families);
    };

    useEffect(() => {
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
                <h1>All Families</h1>
                <CreateFamily onCreatedFamily={addNewFamily} />
                <FamiliesOverview families={families} selectedFamily={setSelectedFamily} />
                {selectedFamily && (
                    <>
                        <h2>Members of the "{selectedFamily.name}" family</h2>
                        <SingleFamilyOverview family={selectedFamily} />
                    </>
                )}
            </main>
        </>
    );
};

export default Families;