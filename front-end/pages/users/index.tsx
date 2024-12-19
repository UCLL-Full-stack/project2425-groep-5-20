import UserService from '@/services/UserService';
import { User } from '@/types';
import Header from '@components/header';
import UserOverview from '@components/users/UserOverview';
import Head from 'next/head';
import { useEffect, useState  } from 'react';
import useInterval from "use-interval";
import useSWR, { mutate } from 'swr';

const Users: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const getAllUsers = async () => {
    const response = await UserService.getAllUsers();
    return response
  };

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const {data, isLoading, error} = useSWR(
    "users",
    getAllUsers,
  )

  useInterval(() => {
    mutate("users", getAllUsers());
  }, 2000);

  return (
    <>
    <div className="bg-[#1F2833] min-h-screen">
      <Head>
        <title>Users</title>
      </Head>
      <Header />
      {loggedInUser && JSON.parse(loggedInUser).role == 'admin' && <main>
        <h1 className='text-[#c5c6c7] mt-5'>All Users</h1>
        <section>
          {error && <p className="text-center text-[#ff0000] mt-4">Failed to load users</p>}
          {isLoading && <p className="text-center text-[#c5c6c7] mt-4">Loading...</p>}
          {data ? <UserOverview users={data} /> : <p className="text-center text-[#c5c6c7] mt-4">No users found.</p>}
        </section>
      </main> || <h1>You are not authorized to access this content</h1>}
      </div>
    </>
  );
};

export default Users;