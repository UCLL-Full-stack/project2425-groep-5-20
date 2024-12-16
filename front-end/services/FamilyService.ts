import { Family, User } from "@/types";

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

// Hierboven u code
const FamilyService = {
    getAllFamlies,
    getFamilyById,
    createFamily,
    removeFamily,
}

export default FamilyService