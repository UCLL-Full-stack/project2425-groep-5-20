import FamilyService from "@/services/FamilyService";
import { Family } from "@/types";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

type Props = {
    family: Family | undefined;
}


const SingleFamilyOverview: React.FC<Props> = ({ family }: Props) => {
    const [loggedInUser, setLoggedInUser] = useState<string | null>();
    const {t} = useTranslation();
    
    const handleRemoveFamilyMember = async (useremail: string, familyId: number | undefined) => {
        if (window.confirm(t("families.familyOverview.status.areYouSureMember"))) {
            if (familyId !== undefined) {
                const response = await FamilyService.getFamilyById(familyId);
                if (response.owner.email === useremail) {
                    alert(t("families.familyOverview.status.noOwner"));
                    return;
                }
                await FamilyService.removeFamilyMember(familyId, useremail);
            }
        }
    }

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, [])

    return (
        <div className=" mt-5 container mx-auto p-4">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th scope="col" className="py-2 px-4 border-b">{t("users.name")}</th>
                        <th scope="col" className="py-2 px-4 border-b">{t("users.email")}</th>
                        <th scope="col" className="py-2 px-4 border-b">{t("users.role")}</th>
                        {loggedInUser && JSON.parse(loggedInUser).role != "child" && (
                            <th scope="col" className="py-2 px-4 border-b">Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {family?.familyList?.map((user, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">{user.name}</td>
                            <td className="py-2 px-4 border-b">{user.email}</td>
                            <td className="py-2 px-4 border-b">{user.role}</td>
                            {loggedInUser && JSON.parse(loggedInUser).role != "child" && (
                                <td className="py-2 px-4 border-b">
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                        onClick={() => user.email && handleRemoveFamilyMember(user.email, family?.id)}
                                    >
                                        {t("families.familyOverview.button.remove")}
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SingleFamilyOverview;