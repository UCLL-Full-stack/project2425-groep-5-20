import UserService from '@/services/UserService';
import { User } from '@/types';
import Header from '@components/header';
import UserOverview from '@components/users/UserOverview';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../../next-i18next.config';
import useInterval from "use-interval";
import useSWR, { mutate } from 'swr';

const Users: React.FC = () => {
  const {t} = useTranslation();
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
        <title>{t("header.nav.users")}</title>
      </Head>
      <Header />
      {loggedInUser && JSON.parse(loggedInUser).role == 'admin' && <main>
        <h1 className='text-[#c5c6c7] mt-5'>{t("users.allUsers")}</h1>
        <section>
          {error && <p className="text-center text-[#ff0000] mt-4">Failed to load users</p>}
          {isLoading && <p className="text-center text-[#c5c6c7] mt-4">Loading...</p>}
          {data ? <UserOverview users={data} /> : <p className="text-center text-[#c5c6c7] mt-4">No users found.</p>}
        </section>
      </main> || <h1>{t("login.status.noAccess")}</h1>}
      </div>
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