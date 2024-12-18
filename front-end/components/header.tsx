import Link from "next/link";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    setLoggedInUser(sessionStorage.getItem("loggedInUser"));
  }, []);

  const handleLogOut = () => {
    sessionStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
  };

  return (
    <header className="bg-[#0B0C10] text-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3 ">
        {/* Logo */}
        <img
          src="/images/Famlist logo white.svg"
          alt="FamList logo"
          className="h-20 w-auto"
        />

        {/* Welcome Message */}
        {loggedInUser && (
          <p className="text-sm text-[#66FCF1]">
            Welcome {JSON.parse(loggedInUser).name}! (
            {JSON.parse(loggedInUser).role})
          </p>
        )}

        {/* Navigation */}
        <ul className="flex space-x-6 list-none">
          <li>
            <Link href="/" className="text-[#66FCF1] hover:text-[#45A29E] transition">
              Home
            </Link>
          </li>

          {loggedInUser && JSON.parse(loggedInUser).role === "admin" && (
            <li>
              <Link
                href="/users"
                className="text-[#66FCF1] hover:text-[#45A29E] transition"
              >
                Users
              </Link>
            </li>
          )}

          {loggedInUser && (
            <li>
              <Link
                href="/families"
                className="text-[#66FCF1] hover:text-[#45A29E] transition"
              >
                Families
              </Link>
            </li>
          )}

          {!loggedInUser && (
            <li>
              <Link
                href="/login"
                className="text-[#66FCF1] hover:text-[#45A29E] transition"
              >
                Sign in
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
                Log out
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
