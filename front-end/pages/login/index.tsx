import Header from "@components/header";
import Head from "next/head";
import LoginPage from "@components/login/LoginPage";
import TableOverview from "@components/home/TableOverview";

const Login: React.FC = () => {
    return (
        <>
        <Header/>
        <div className="bg-[#1F2833] text-white min-h-screen flex flex-col items-center justify-center">
            <Head>
                <title>Login</title>
            </Head>
            <h1 className="text-[#c5c6c7] mb-5">Login</h1>
            <main className="w-full max-w-md p-8 bg-[#0B0C10] rounded-lg shadow-md">
                <LoginPage/>
            </main>
            <div className="text-black">
                <h1 className="text-[#c5c6c7] mt-5">Test Users</h1>
                <h2 className="text-[#c5c6c7] text-center mb-5" >These are the users that the lecturers can use to perform tests on our application.</h2>
                <TableOverview></TableOverview>
            </div>
        </div>
        </>
    );
}

export default Login;