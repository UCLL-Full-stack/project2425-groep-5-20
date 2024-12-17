import { Family, User } from "@/types";
import UserService from "./UserService";

// GET 

const getToken = () => {
    return JSON.parse(sessionStorage.getItem("loggedInUser") as string)?.token;
  }

const getAllFamlies = async () => {
    const token = getToken();
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL +'/families', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
        })

        return await response.json();
    } catch (error) {
        console.error('Error fetching families:', error);
        return [];
    }
}

const getFamilyById = async(familyId: number) => {
    const token = getToken();
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL +`/families/${familyId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
        })

        return await response.json();
    } catch (error) {
        console.error('Error fetching families:', error);
    }
}

// POST

const createFamily = async (familyName: string, userEmail: string): Promise<Family | null> => {
    const token = getToken();
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/families', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({familyName, userEmail}),
        });

        if (!response.ok) {
            throw new Error('Failed to create family');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating family:', error);
        return null;
    }
};


const addFamilyMember = async (familyId: number, email: string): Promise<User | null> => {
    const token = getToken();
    try {
        if (!email) {
            throw new Error('No email provided');
        }
        if (!await UserService.getUserByEmail(email)) {
            throw new Error('No user found with this email');
        }
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/families/${familyId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({email}),
        });

        if (!response.ok) {
            throw new Error('Failed to add family member');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding family member:', error);
        return null;
    }
};


// DELETE

const removeFamily = async (familyId: number) => {
    const token = getToken();
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/families/${familyId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to remove family');
        }

        return true;
    } catch (error) {
        console.error('Error removing family:', error);
        return false;
    }
};

const removeFamilyMember = async (familyId: number, email: string) => {
    const token = getToken();
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/families/${familyId}/member`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({email}),
        });

        if (!response.ok) {
            throw new Error('Failed to remove family member');
        }

        return true;
    } catch (error) {
        console.error('Error removing family member:', error);
        return false;
    }
};

// Hierboven u code
const FamilyService = {
    getAllFamlies,
    getFamilyById,
    createFamily,
    removeFamily,
    addFamilyMember,
    removeFamilyMember,
}

export default FamilyService