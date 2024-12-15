import { Role, User } from "@/types";

const getToken = () => {
  return JSON.parse(sessionStorage.getItem("loggedInUser") as string)?.token;
}

const getAllUsers = async (): Promise<Array<User>> => {
  const token = getToken();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(apiUrl + '/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
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
  const token = getToken();
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error getting user with certain email:', error);
  }
}

const createUser = async (name: string, email: string, password: string, role: Role) => {
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

const login = async(email: string, password: string)  => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/users/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password})
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
  login,
};

export default UserService;