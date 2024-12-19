import UserService from '@/services/UserService';
import { User } from '@/types';
import Header from '@components/header';
import UserOverview from '@components/users/UserOverview';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../../next-i18next.config';

const Users: React.FC = () => {
  const {t} = useTranslation();

  const [users, setUsers] = useState<Array<User>>([]);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const getAllUsers = async () => {
    const response = await UserService.getAllUsers();
    if (Array.isArray(response)) {
      setUsers(response);
    } else {
      console.error('Unexpected response format:', response);
    }
  };

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
    getAllUsers();
  }, []);

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Header />
      {loggedInUser && JSON.parse(loggedInUser).role == 'admin' && <main>
        <h1>All Users</h1>
        <section>
          {users.length > 0 ? <UserOverview users={users} /> : <p>No users found.</p>}
        </section>
      </main> || <h1>You are not authorized to access this content</h1>}
    </>
  );
};

export const getServerSideProps = async(content: { locale: any; }) => {
  const {locale} = content;

  return {
      props: {
          ...(await serverSideTranslations(locale ?? 'en', ['common'], nextI18NextConfig))
      }
  }
}

export default Users;