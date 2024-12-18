import Header from "@components/header";
import Head from "next/head";
import LoginPage from "@components/login/LoginPage";

const Login: React.FC = () => {
    return (
        <>
        <Header/>
        <div className="bg-[#1F2833] text-white min-h-screen flex flex-col items-center justify-center">
            <Head>
                <title>Login</title>
            </Head>
            
            <main className="w-full max-w-md p-8 bg-[#0B0C10] rounded-lg shadow-md">
                <LoginPage/>
            </main>
        </div>
        </>
    );
}

export default Login;