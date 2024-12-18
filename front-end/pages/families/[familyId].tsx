import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@components/header';
import FamilyService from '@/services/FamilyService';
import { Family } from '@/types';
import { useRouter } from 'next/router';
import SingleFamilyOverview from '@components/families/familyId/SingleFamilyOverview';
import ShoppingListsOverview from '@components/families/familyId/ShoppingListsOverview';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FamilyID: React.FC = () => {
  const router = useRouter();
  const { familyId } = router.query;

  const [family, setFamily] = useState<Family>();
  const [loggedInUser, setLoggedInUser] = useState<string | null>();
  const [selectedOption, setSelectedOption] = useState<boolean>(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState<boolean>(false);
  const [showAddMemberDialog, setShowAddMemberDialog] = useState<boolean>(false);
  const [newMemberEmail, setNewMemberEmail] = useState<string>("");

  const [userEmailError, setUserEmailError] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");

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

  const validateEmail = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let result = true;

    if (newMemberEmail.trim() === '' || !emailRegex.test(newMemberEmail)) {
      setUserEmailError('Email should be a valid email.');
      result = false;
    }

    return result;
  };

  const handleSelectedOption = (option: boolean) => {
    setSelectedOption(option);
  };

  const handleRemoveFamily = async () => {
    await FamilyService.removeFamily(parseInt(familyId as string));
    router.push('/families');
  };

  const handleAddFamilyMember = async () => {
    setUserEmailError('');
    setStatusMessage('');

    if (!validateEmail()) {
      return;
    }

    const response = await FamilyService.addFamilyMember(parseInt(familyId as string), newMemberEmail);
    if (response) {
      setShowAddMemberDialog(false);
      setNewMemberEmail('');
      setStatusMessage('Family member added successfully');
    } else {
      setStatusMessage('Failed to add family member');
    }
  };

  return (
    <>
      <Head>
        <title>{family?.name}</title>
      </Head>
      <div className="bg-[#1F2833] min-h-screen">
        <main>
          <Header />
          {loggedInUser ? (
            <div className="flex flex-col items-center mt-10">
              <h1 className="text-3xl font-bold text-center text-[#c5c6c7] mb-6">
                {family?.name} Details
              </h1>
              <div className="flex justify-center space-x-4 my-4">
                <button
                  className={`py-2 px-4 rounded ${
                    !selectedOption ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'
                  }`}
                  onClick={() => handleSelectedOption(false)}
                >
                  Family Overview
                </button>
                <button
                  className={`py-2 px-4 rounded ${
                    selectedOption ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'
                  }`}
                  onClick={() => handleSelectedOption(true)}
                >
                  Shopping Lists
                </button>
              </div>

              {/* Card wrapper */}
              <div className="bg-[#303341] shadow-lg rounded-lg w-11/12 md:w-3/5 p-6 text-black">
                {!selectedOption ? (
                  <>
                    <SingleFamilyOverview family={family} />
                    {JSON.parse(loggedInUser).role !== 'child' && (
                      <div className="flex justify-end space-x-4 my-4 mr-4">
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                          onClick={() => setShowRemoveDialog(true)}
                        >
                          Remove Family
                        </button>
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                          onClick={() => setShowAddMemberDialog(true)}
                        >
                          Add a Family Member
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <ShoppingListsOverview family={family} />
                )}
              </div>
            </div>
          ) : (
            <h1 className="text-center text-[#ff0000] mt-10">
              You are not authorized to access this content.
            </h1>
          )}
        </main>
      </div>

      {/* remove family pop up ding */}
      <Dialog open={showRemoveDialog} onOpenChange={setShowRemoveDialog}>
        <DialogContent className="bg-[#1F2833] text-white rounded-lg shadow-lg p-6 outline-none border-none">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-[#66FCF1]">Remove Family</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to remove the family?</p>
          <DialogFooter className="flex justify-end mt-4">
            <Button variant="destructive" onClick={handleRemoveFamily}>
              Yes
            </Button>
            <Button className='border border-white' variant="ghost" onClick={() => setShowRemoveDialog(false)}>
              No
            </Button>
            
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* add family member pop up ding */}
      <Dialog open={showAddMemberDialog} onOpenChange={setShowAddMemberDialog}>
        <DialogContent className="bg-[#1F2833] text-white rounded-lg shadow-lg p-6 outline-none border-none">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-[#66FCF1]">Add Family Member</DialogTitle>
          </DialogHeader>
          <p>Please enter the email of the family member you want to add.</p>
          <Input
            type="email"
            placeholder="example@email.com"
            value={newMemberEmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMemberEmail(e.target.value)}
            className="mt-2"
          />
          {userEmailError && <p className="text-red-500 mt-1">{userEmailError}</p>}
          <DialogFooter className="flex justify-end mt-4">
            <Button variant="default" onClick={handleAddFamilyMember}>
              Submit
            </Button>
            <Button variant="ghost" onClick={() => setShowAddMemberDialog(false)}>
              Cancel
            </Button>
            
          </DialogFooter>
          {statusMessage && (
            <p
              className={`mt-4 text-center font-semibold ${
                statusMessage.includes('success') ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {statusMessage}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FamilyID;
