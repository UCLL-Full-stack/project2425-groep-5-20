import UserService from "@/services/UserService";
import { Role } from "@/types";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

const LoginPage: React.FC = () => {
    const {t} = useTranslation();

    const router = useRouter();
    // Form waarden
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [signUpForm, setSignUpForm] = useState<boolean>(false);
    // Errors voor de form waarden
    const [nameError, setNameError] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [selectedOptionError, setSelectedOptionError] = useState<string>('');
    const [statusMessage, setStatusMessage] = useState<string>('');
    
    const errorClear = () => {
        setNameError('');
        setEmailError('');
        setPasswordError('');
        setSelectedOptionError('');
        setStatusMessage('');
    }


    const validationSignUp = (): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let result = true;

        if (name.trim() === '') {
            setNameError(`${t("login.status.nameError")}`);
            result = false;
        }
        if (password.trim() === '' || password.length < 8) {
            setPasswordError(`${t("login.status.passwordError")}`);
            result = false;
        }
        if (email.trim() === '' || !emailRegex.test(email)) {
            setEmailError(`${t("login.status.emailError")}`)
            result = false;
        }
        if (selectedOption.trim() === '') {
            setSelectedOptionError(`${t("login.status.options")}`)
            result = false;
        }

        return result;

    }

    const validationLogIn = (): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let result = true;

        if (password.trim() === '' || password.length < 8) {
            setPasswordError(`${t("login.status.passwordError")}`);
            result = false;
        }
        if (email.trim() === '' || !emailRegex.test(email)) {
            setEmailError(`${t("login.status.emailError")}`)
            result = false;
        }
        
        return result;

    }

    const saveUser = async (event:any) => {
        event.preventDefault();
        
        errorClear();
        if (!validationSignUp()) {
            return;
        }


        const response = await UserService.createUser(name, email, password, selectedOption as Role);

        if (response.status) {
            setEmailError(`${t("login.status.userExists")}`);
            return;
        }


        localStorage.setItem("loggedInUser", JSON.stringify({
            token: response.token,
            name: response.name,
            email: response.email,
            role: response.role
          }));

        if (response.role != "child") {
            localStorage.setItem("isParent", JSON.stringify({
                isParent: true
            }));
        } else {
            localStorage.setItem("isParent", JSON.stringify({
                isParent: false
            })); 
        }

        setStatusMessage(`${t("login.status.success2sec")}`);
        setTimeout(() => {
            setStatusMessage(`${t("login.status.success1sec")}`);
        }, 1000);
        setTimeout(()=> {
            router.push('/');
        }, 2000);
        
    }

    const logIn = async(event: any) => {
        event.preventDefault();

        errorClear();
        if (!validationLogIn()) {
            return;
        }

        const user = await UserService.login(email, password);

        if (user.status != null) {
            setEmailError(`${t("login.status.incorrect")}`);
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify({
            token: user.token,
            name: user.name,
            email: user.email,
            role: user.role
          }));
        if (user.role != "child") {
            localStorage.setItem("isParent", JSON.stringify({
                isParent: true
            }));
        } else {
            localStorage.setItem("isParent", JSON.stringify({
                isParent: false
            })); 
        }
        setStatusMessage(`${t("login.status.success2sec")}`);
        setTimeout(()=> {
            setStatusMessage(`${t("login.status.success1sec")}`);
        }, 1000)

        setTimeout(()=> {
            router.push('/');
        }, 2000)
        
    }

    return (
        <>
            {signUpForm && <form className="login space-y-4" onSubmit={saveUser}>
                <div>
                    <label id="name" className="block text-sm font-medium text-gray-300">{t("users.name")}</label>
                    <input id="login-name" type="text" value={name} onChange={(event) => setName(event.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" />
                </div>

                <div>
                    <label id="email" className="block text-sm font-medium text-gray-300">{t("users.email")}</label>
                    <input id="login-email" type="text" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" />
                </div>

                <div>
                    <label id="password" className="block text-sm font-medium text-gray-300">{t("users.password")}</label>
                    <input id="login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" />
                </div>

                <div className="parentOrChild space-y-2">
                    <label id="parentOrChild" className="block text-sm font-medium text-gray-300">
                        {t("login.button.parent")}
                        <input 
                            type="radio"
                            value='parent'
                            checked={selectedOption === 'parent'}
                            onChange={(event) => setSelectedOption(event.target.value)}
                            className="ml-2"
                        />
                    </label>
                    <label id="parentOrChild" className="block text-sm font-medium text-gray-300">
                        {t("login.button.child")}
                        <input 
                            type="radio"
                            value='child'
                            checked={selectedOption === "child"}
                            onChange={(event) => setSelectedOption(event.target.value)}
                            className="ml-2"
                        />
                    </label>
                </div>
                <button id="signInButton" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">Sign up</button>
                <div className="no-account-message mt-4 text-center">
                    <p>{t("login.hasAccount")} <a className="no-account-message-button text-blue-400 hover:underline cursor-pointer" onClick={() => setSignUpForm(false)}>{t("login.button.login")}!</a></p>
                </div>
                <div className="errorMessages mt-4 text-red-500 text-center">
                    {nameError && <p>{nameError}</p>}
                    {emailError && <p>{emailError}</p>}
                    {passwordError && <p>{passwordError}</p>}
                    {selectedOptionError && <p>{selectedOptionError}</p>}
                </div>
                <div className="signInSuccess mt-4 text-green-500 text-center">
                    {statusMessage && <p>{statusMessage}</p>}
                </div>
            </form>}
            {!signUpForm && <form className="login space-y-4" onSubmit={logIn}>
                <div>
                    <label id="email" className="block text-sm font-medium text-gray-300">{t("users.email")}</label>
                    <input id="login-email" type="text" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" />
                </div>

                <div>
                    <label id="password" className="block text-sm font-medium text-gray-300">{t("users.password")}</label>
                    <input id="login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" />
                </div>
                <button id="signInButton" className="w-full py-2 px-4 bg-[#66FCF1] text-black rounded-md shadow-sm hover:bg-[#45A29E] focus:outline-none focus:ring focus:border-blue-300">Log in</button>
                <div className="no-account-message mt-4 text-center">
                    <p>{t("login.hasnoAccount")} <a className="no-account-message-button text-blue-400 hover:underline cursor-pointer" onClick={() => setSignUpForm(true)}>{t("login.button.signUp")}!</a></p>
                </div>
                <div className="errorMessages mt-4 text-red-500 text-center">
                    {emailError && <p>{emailError}</p>}
                    {passwordError && <p>{passwordError}</p>}
                </div>
                <div className="signInSuccess mt-4 text-green-500 text-center">
                    {statusMessage && <p>{statusMessage}</p>}
                </div>
            </form>}
        </>
    )
}

export default LoginPage;