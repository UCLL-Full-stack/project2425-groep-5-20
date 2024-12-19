import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import  { serverSideTranslations }  from 'next-i18next/serverSideTranslations';
import Language from "./language";



const Header: React.FC = () => {
  const {t} = useTranslation();

  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  },[])

  const handleLogOut = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  }

  return (
    
    <header>
      <div className="nav">
        <img src="/images/FamList Temp.png" alt="famlist logo" />
        {loggedInUser && <p className="welcomeUser">{t("header.welcome")} {JSON.parse(loggedInUser).name}! ({JSON.parse(loggedInUser).role})</p>}
        <ul>
          <Language/>
          <Link href="/">
            {t('header.nav.home')}
          </Link>

          {loggedInUser && JSON.parse(loggedInUser).role == 'admin' && <Link href="/users">
            {t('header.nav.users')}
          </Link>}

          {loggedInUser && <Link href="/families">
            {t('header.nav.families')}
          </Link>}

          {!loggedInUser && <Link href='/login'>
            {t('header.nav.signin')}
          </Link>}
          
          {loggedInUser && <Link onClick={handleLogOut} href='/'>
          {t('header.nav.logOut')}
          </Link>}
          
        </ul>
      </div>
    </header>
  );
};

export default Header;
