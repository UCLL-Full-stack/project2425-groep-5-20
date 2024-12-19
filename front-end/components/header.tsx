import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Language from "./language";

const Header: React.FC = () => {
  const {t} = useTranslation();

  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  },[])

  const handleLogOut = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem("isParent");
    setLoggedInUser(null);
  };

  return (
    <header className="bg-[#0B0C10] text-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3 ">
        {/* Logo */}
        <img
          src="/images/Famlist logo wit.png"
          alt="FamList logo"
          className="h-20 w-auto"
        />

        {/* Welcome Message */}
        {loggedInUser && (
          <p className="text-sm text-[#66FCF1]">
            {t("header.welcome")} {JSON.parse(loggedInUser).name}! (
            {JSON.parse(loggedInUser).role})
          </p>
        )}

        {/* Navigation */}
        <ul className="flex space-x-6 list-none">
          <li>
            <Language/>
          </li>
          <li>
            <Link href="/" className="text-[#66FCF1] hover:text-[#45A29E] transition">
            {t("header.nav.home")}
            </Link>
          </li>

          {loggedInUser && JSON.parse(loggedInUser).role === "admin" && (
            <li>
              <Link
                href="/users"
                className="text-[#66FCF1] hover:text-[#45A29E] transition"
              >
                {t("header.nav.users")}
              </Link>
            </li>
          )}

          {loggedInUser && (
            <li>
              <Link
                href="/families"
                className="text-[#66FCF1] hover:text-[#45A29E] transition"
              >
                {t("header.nav.families")}
              </Link>
            </li>
          )}

          {!loggedInUser && (
            <li>
              <Link
                href="/login"
                className="text-[#66FCF1] hover:text-[#45A29E] transition"
              >
                {t("header.nav.signIn")}
              </Link>
            </li>
          )}

          {loggedInUser && (
            <li>
              <Link
                href="/"
                onClick={handleLogOut}
                className="text-[#66FCF1] hover:text-[#45A29E] transition"
              >
                {t("header.nav.logOut")}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
