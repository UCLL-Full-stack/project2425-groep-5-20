import FamilyService from "@/services/FamilyService";
import UserService from "@/services/UserService";
import { useState } from "react";

type Props = {
    onCreatedFamily: any;
    email: string,
    role: string
}

const CreateFamily: React.FC<Props> = ({onCreatedFamily, email, role}: Props) => {
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [newFamilyName, setNewFamilyName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    // Error states
    const [familyNameError, setFamilyNameError] = useState('');
    const [userEmailError, setUserEmailError] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    
    const errorClear = () => {
        setFamilyNameError('');
        setUserEmailError('');
        setStatusMessage('');
    };


    const handleCreateFamilyClick = () => {
        setIsInputVisible(!isInputVisible);
    };

    const validation = (): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let result = true;

        if (newFamilyName.trim() === '') {
            setFamilyNameError('Family name is required.');
            result = false;
        }
        if (role == "admin"){
            if (userEmail.trim() === '' || !emailRegex.test(userEmail)) {
                setUserEmailError('Email should be a valid email.');
                result = false;
        }}

        return result;
    };

    const handleAddFamily = async (event: any) => {
        event.preventDefault();
        
        errorClear();
        if (!validation()) {
            return;
        }

        if (role == 'admin') {
            const user = await UserService.getUserByEmail(userEmail);
            if (!user || user.email !== userEmail) {
                setUserEmailError("No user with that email exists!");
                return;
        }}
        console.log(email)
        console.log(role)

        const newFamily = await FamilyService.createFamily(newFamilyName, email);
        if (newFamily) {
            onCreatedFamily(newFamily);
            setNewFamilyName("");
            setUserEmail("");
            setIsInputVisible(false);
            setStatusMessage('Family created successfully');
        } else {
            setStatusMessage('Failed to create family');
        }
    };


    return <>
        <div className="familybutton">
            <button 
                className="bg-[#66FCF1] hover:bg-[#45A29E] text-[#1F2833] font-bold py-2 px-4 rounded mb-5" 
                id="createFamilyButton" 
                onClick={handleCreateFamilyClick}
            >
                Create New Family
            </button>

            {isInputVisible && (
                <div>
                    <form className="space-y-4" onSubmit={handleAddFamily}>
                        <div>
                            <label id="familyname" className="block text-sm font-medium text-gray-300">Please enter new family name.</label>
                            <input
                                type="text"
                                value={newFamilyName}
                                onChange={(event) => setNewFamilyName(event.target.value)}
                                placeholder="Enter family name"
                                className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            />
                            {familyNameError && <p className="error text-red-500 mt-2">{familyNameError}</p>}
                        </div>
                        {role == 'admin' && (
                            <div>
                                <label id="useremail" className="block text-sm font-medium text-gray-300">Please enter your user email.</label>
                                <input
                                    type="text"
                                    value={userEmail}
                                    onChange={(event) => setUserEmail(event.target.value)}
                                    placeholder="Enter your user email"
                                    className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                                />
                                {userEmailError && <p className="error text-red-500 mt-2">{userEmailError}</p>}
                            </div>
                        )}
                        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">Add Family</button>
                    </form>
                </div>
            )}
            {statusMessage && <p className="success text-green-500 mt-4">{statusMessage}</p>}
        </div>
    </>
}


export default CreateFamily;