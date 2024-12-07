import FamilyService from "@/services/FamilyService";
import UserService from "@/services/UserService";
import { useState } from "react";

type Props = {
    onCreatedFamily: any;
}

const CreateFamily: React.FC<Props> = ({onCreatedFamily}: Props) => {
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
        if (userEmail.trim() === '' || !emailRegex.test(userEmail)) {
            setUserEmailError('Email should be a valid email.');
            result = false;
        }

        return result;
    };

    const handleAddFamily = async (event: any) => {
        event.preventDefault();
        
        errorClear();
        if (!validation()) {
            return;
        }

        const user = await UserService.getUserByEmail(userEmail);
        if (!user || user.email !== userEmail) {
            setUserEmailError("No user with that email exists!");
            return;
        }

        const newFamily = await FamilyService.createFamily(newFamilyName, userEmail);
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
            <button id="createFamilyButton" onClick={handleCreateFamilyClick}>Create New Family</button>
            {isInputVisible && (
                <div>
                    <form className="newfamily" onSubmit={handleAddFamily}>
                        <div>
                            <label id="familyname">Please enter new family name.</label>
                            <input
                                type="text"
                                value={newFamilyName}
                                onChange={(event) => setNewFamilyName(event.target.value)}
                                placeholder="Enter family name"
                            />
                            {familyNameError && <p className="error">{familyNameError}</p>}
                        </div>
                        <div>
                            <label id="useremail">Please enter your user email.</label>
                            <input
                                type="text"
                                value={userEmail}
                                onChange={(event) => setUserEmail(event.target.value)}
                                placeholder="Enter your user email"
                            />
                            {userEmailError && <p className="error">{userEmailError}</p>}
                        </div>
                        <button type="submit">Add Family</button>
                    </form>
                </div>
            )}
            {statusMessage && <p className="success">{statusMessage}</p>}
        </div>
    </>
}


export default CreateFamily;