import { Role, User } from "@/types";

const getAllUsers = async (): Promise<Array<User>> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(apiUrl + '/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    
    console.error('Error fetching users:', error);
    return [];
  }
};

const getUserByEmail = async (email: string): Promise<User | undefined>=> {
  
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error getting user with certain email:', error);
  }
}

const createUser = async (name: string, email: string, password: string, role: Role): Promise<User | undefined> => {
  const user: User = {name, email, password, role};
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/users/signup`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    });

    const data = await response.json()
    return data;
  } catch (error) {
    console.error('Error creating a user:', error);
  }
}

const UserService = {
  getAllUsers,
  getUserByEmail,
  createUser,
};

export default UserService;