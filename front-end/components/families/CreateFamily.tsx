import FamilyService from "@/services/FamilyService";
import UserService from "@/services/UserService";
import { useTranslation } from "next-i18next";
import { useState } from "react";

type Props = {
    onCreatedFamily: any;
    email: string,
    role: string
}

const CreateFamily: React.FC<Props> = ({onCreatedFamily, email, role}: Props) => {
    const {t} = useTranslation();
    
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
            setFamilyNameError(`${t("families.status.familyError")}`);
            result = false;
        }
        if (role == "admin"){
            if (userEmail.trim() === '' || !emailRegex.test(userEmail)) {
                setUserEmailError(`${t("families.status.emailError")}`);
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
                setUserEmailError(`${t("families.status.noUserWithThisEmail")}`);
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
            setStatusMessage(`${t("families.status.success")}`);
        } else {
            setStatusMessage('Failed to create family');
        }
    };


    return <>
        <div className="familybutton">
            <button id="createFamilyButton" onClick={handleCreateFamilyClick}>{t("families.createNewFamily")}</button>
            {isInputVisible && (
                <div>
                    <form className="newfamily" onSubmit={handleAddFamily}>
                        <div>
                            <label id="familyname">{t("families.pleaseEnterNewName")}</label>
                            <input
                                type="text"
                                value={newFamilyName}
                                onChange={(event) => setNewFamilyName(event.target.value)}
                                placeholder={t("families.name")}
                            />
                            {familyNameError && <p className="error">{familyNameError}</p>}
                        </div>
                        {role == 'admin' &&<div>
                            <label id="useremail">{t("families.pleaseEnterEmail")}.</label>
                            <input
                                type="text"
                                value={userEmail}
                                onChange={(event) => setUserEmail(event.target.value)}
                                placeholder={t("users.email")}
                            />
                            {userEmailError && <p className="error">{userEmailError}</p>}
                        </div>}
                        <button type="submit">{t("families.addFamily")}</button>
                    </form>
                </div>
            )}
            {statusMessage && <p className="success">{statusMessage}</p>}
        </div>
    </>
}


export default CreateFamily;