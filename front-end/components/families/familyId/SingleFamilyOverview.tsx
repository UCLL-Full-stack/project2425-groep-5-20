import FamilyService from "@/services/FamilyService";
import { Family } from "@/types";
import { useEffect, useState } from "react";

type Props = {
    family: Family | undefined;
}

const handleRemoveFamilyMember = async (useremail: string, familyId: number | undefined) => {
    
    if (window.confirm("Are you sure you want to remove this member?")) {
        if (familyId !== undefined) {
            const response = await FamilyService.getFamilyById(familyId);
            if (response.owner.email === useremail) {
                alert("You can't remove the owner");
                return;
            }
            await FamilyService.removeFamilyMember(familyId, useremail);
        }
    }
}


const SingleFamilyOverview: React.FC<Props> = ({family}: Props) => {
    const [loggedInUser, setLoggedInUser] = useState<string | null>();

    useEffect(() => {
        setLoggedInUser(sessionStorage.getItem('loggedInUser'));
    }, [])
    
    return <>
    <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
        </tr>
        </thead>
        <tbody>
            {family?.familyList?.map((user, idx) => (
                <tr key={idx}>
                    <td>
                        {user.name}
                    </td>
                    <td>
                        {user.email}
                    </td>
                    <td>
                        {user.role}
                    </td>
                    {loggedInUser && JSON.parse(loggedInUser).role != "child" && <td>
                        <button onClick={() => user.email && handleRemoveFamilyMember(user.email, family?.id)}>Remove</button>
                    </td>}
                </tr>
            ))}
        </tbody>
    </table>
    </>
}
export default SingleFamilyOverview;