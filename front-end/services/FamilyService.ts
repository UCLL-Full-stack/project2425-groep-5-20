import { Family, User } from "@/types";

const getAllFamlies = async () => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL +'/families', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return await response.json();
    } catch (error) {
        console.error('Error fetching families:', error);
        return [];
    }
}

const createFamily = async (familyName: string, userEmail: string): Promise<Family | null> => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/families', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
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


// Hierboven u code
const FamilyService = {
    getAllFamlies,
    createFamily,
}

export default FamilyService