import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@components/header';
import FamilyService from '@/services/FamilyService';
import { Family } from '@/types';
import { useRouter } from 'next/router';
import SingleFamilyOverview from '@components/families/familyId/SingleFamilyOverview';
import ShoppingListsOverview from '@components/families/familyId/ShoppingListsOverview';

const FamilyID: React.FC = () => {
    const router = useRouter();
    const { familyId } = router.query;

    const [family, setFamily] = useState<Family>();
    const [loggedInUser, setLoggedInUser] = useState<string | null>();
    const [selectedOption, setSelectedOption] = useState<boolean>(false);

    useEffect(() => {
        setLoggedInUser(localStorage.getItem("loggedInUser"));
        if (familyId) {
            getFamilyById(parseInt(familyId as string));
        }
    }, [familyId]);

    const getFamilyById = async (familyId: number) => {
        const family = await FamilyService.getFamilyById(familyId);
        setFamily(family);
    };

    const handleSelectedOption = (option: boolean) => {
        setSelectedOption(option);
    };

    const handleRemoveFamily = async () => {
        if (window.confirm("Are you sure you want to remove this family?")) {
            await FamilyService.removeFamily(parseInt(familyId as string));
            router.push('/families');
        }
    };

    const handleAddFamilyMember = () => {
        const email = prompt("Please enter the email of the family member you want to add.");
        if (email) {
            FamilyService.addFamilyMember(parseInt(familyId as string), email);
        }
    };

    return (
        <>
            <Head>
                <title>{family?.name}</title>
            </Head>
            <div className='bg-[#1F2833]'>
                <main>
                    <Header />
                    {loggedInUser ? (
                        <>
                        <h1 className=" mb-5 mt-5 text-center text-2xl text-white">Overview of {family?.name}</h1>
                            <div className='selectOptionFamilyOrShoppingLists flex justify-center space-x-4 my-4'>
                                <button 
                                    className={`py-2 px-4 rounded ${!selectedOption ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`} 
                                    onClick={() => handleSelectedOption(false)}
                                >
                                    Family Overview
                                </button>
                                <button 
                                    className={`py-2 px-4 rounded ${selectedOption ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`} 
                                    onClick={() => handleSelectedOption(true)}
                                >
                                    Shopping Lists
                                </button>
                            </div>
                            {!selectedOption ? (
                                <>
                                    
                                    {JSON.parse(loggedInUser).role !== 'child' && (
                                        <div className="flex justify-center space-x-4 my-4">
                                            <button 
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={handleRemoveFamily}
                                            >
                                                Remove Family
                                            </button>
                                            <button 
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={handleAddFamilyMember}
                                            >
                                                Add a family member
                                            </button>
                                        </div>
                                    )}
                                    <SingleFamilyOverview family={family} />
                                </>
                            ) : (
                                <ShoppingListsOverview family={family} />
                            )}
                        </>
                    ) : (
                        <h1 className="text-center text-2xl text-red-500">You are not authorized to view this content.</h1>
                    )}
                </main>
            </div>
        </>
    );
};

export default FamilyID;