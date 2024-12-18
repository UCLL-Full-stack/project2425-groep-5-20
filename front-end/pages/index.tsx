import Head from "next/head";
import Header from "@components/header";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, [loggedInUser]);

  return (
    <>
      <Header />
      <div className="bg-[#1F2833] min-h-screen flex flex-col items-center text-[#c5c6c7]">
        <Head>
          <title>FamList</title>
          <meta name="description" content="A family-focused app for managing grocery lists" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center text-center px-6 py-10 w-full max-w-4xl">
          <section className="mb-10">
            <h1 className="text-5xl font-bold mb-4 text-[#66FCF1]">Welcome to FamList</h1>
            <p className="text-lg leading-relaxed">
              FamList is the ultimate app for families to stay organized and make shopping a breeze. 
              Say goodbye to forgotten items and hello to a stress-free grocery experience!
            </p>
          </section>
          
          <section className="bg-[#0B0C10] p-8 rounded-lg shadow-lg mb-10 w-full">
            
            {!loggedInUser ? (
              <>
                <h2 className="text-3xl font-semibold mb-4 text-[#66FCF1]">Get Started Today!</h2>
                <p className="text-lg mb-6">
                  Ready to simplify your family’s grocery planning? Click below to sign up and get started!
                </p>
                <Link href="/login">
                  <button className="bg-[#66FCF1] hover:bg-[#45A29E] text-[#0B0C10] font-bold py-3 px-6 rounded-full shadow-md transition-transform transform hover:scale-105">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-semibold mb-4 text-[#66FCF1]">Hello {JSON.parse(loggedInUser).name}</h2>
                <p className="text-lg mb-6">
                  Welcome back! Click on the button below to view your families!
                </p>
                <Link href="/families">
                  <button className="bg-[#66FCF1] hover:bg-[#45A29E] text-[#0B0C10] font-bold py-3 px-6 rounded-full shadow-md transition-transform transform hover:scale-105">
                    Go to Families
                  </button>
                </Link>
              </>
            )}
          </section>

          <section className="bg-[#1b1e27] p-8 rounded-lg shadow-lg mb-10 w-full">
            <h2 className="text-3xl font-semibold mb-6 text-[#66FCF1]">Why Use FamList?</h2>
            <ul className="space-y-4 text-left text-lg">
              <li>📋 <strong>Collaborative Grocery Lists:</strong> Everyone in the family can add items to the shared list.</li>
              <li>📱 <strong>Accessible Anywhere:</strong> Update and view lists on any device, anytime.</li>
              <li>🛒 <strong>Streamlined Shopping:</strong> Check items off as you shop for a smooth experience.</li>
              <li>🔔 <strong>Reminders and Notifications:</strong> Get reminders so you never miss adding an item again.</li>
            </ul>
            <h2 className="text-3xl font-semibold mb-4 text-[#66FCF1]">How It Works</h2>
            <ol className="text-lg space-y-3 text-left">
              <li> Create a family group and invite members to join.</li>
              <li> Start adding items to the shared grocery list.</li>
              <li> Mark items as purchased during your shopping trips.</li>
              <li> Enjoy a stress-free and efficient grocery shopping experience!</li>
            </ol>
          </section>
        </main>
      </div>
    </>
  );
}
