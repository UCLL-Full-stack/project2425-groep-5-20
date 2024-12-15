import Link from "next/link";
import { useEffect, useState } from "react";


const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  

  useEffect(() => {
    setLoggedInUser(sessionStorage.getItem('loggedInUser'));
  },[])

  const handleLogOut = () => {
    sessionStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  }

  return (
    
    <header>
      <div className="nav">
        <img src="/images/FamList Temp.png" alt="famlist logo" />
        {loggedInUser && <p className="welcomeUser">Welcome {JSON.parse(loggedInUser).name}!</p>}
        <ul>
          <Link href="/">
            Home
          </Link>

          {loggedInUser && JSON.parse(loggedInUser).role == 'admin' && <Link href="/users">
            Users
          </Link>}

          {loggedInUser && <Link href="/families">
            Families
          </Link>}

          {!loggedInUser && <Link href='/login'>
            Sign in
          </Link>}
          
          {loggedInUser && <Link onClick={handleLogOut} href='/'>
            Log out
          </Link>}
          
        </ul>
      </div>
    </header>
  );
};

export default Header;
