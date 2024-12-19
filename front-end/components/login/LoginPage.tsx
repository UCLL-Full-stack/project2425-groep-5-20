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
            {signUpForm && <form className="login" onSubmit={saveUser}>
                <div>
                <label id="name">{t("users.name")}</label>
                <input id="login-name" type="text" value={name} onChange={(event) => setName(event.target.value)} />
                </div>

                <div>
                <label id="email">{t("users.email")}</label>
                <input id="login-email" type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>

                <div>
                <label id="password">{t("users.password")}</label>
                <input id="login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>

                <div className="parentOrChild">
                <label id="parentOrChild">
                    {t("login.button.parent")}
                    <input 
                    type="radio"
                    value='parent'
                    checked={selectedOption === 'parent'}
                    onChange={(event) => setSelectedOption(event.target.value)}
                     />
                </label>
                <label id="parentOrChild">
                    {t("login.button.child")}
                    <input 
                    type="radio"
                    value='child'
                    checked={selectedOption === "child"}
                    onChange={(event) => setSelectedOption(event.target.value)}
                    />
                </label>
                </div>
                <button id="signInButton">{t("login.button.signUp")}</button>
                <div className="no-account-message"><p>{t("login.hasAccount")} <a className="no-account-message-button"  onClick={() => setSignUpForm(false)}>{t("login.button.login")}!</a></p></div>
                <div className="errorMessages">
                {nameError && <p>{nameError}</p>}
                {emailError && <p>{emailError}</p>}
                {passwordError && <p>{passwordError}</p>}
                {selectedOptionError && <p>{selectedOptionError}</p>}
                </div>
                <div className="signInSuccess">
                    {statusMessage && <p>{statusMessage}</p>}
                </div>

            </form>}
            {!signUpForm && <form className="login" onSubmit={logIn}>
            <div>
                <label id="email">{t("users.email")}</label>
                <input id="login-email" type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>

                <div>
                <label id="password">{t("users.password")}</label>
                <input id="login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <button id="signInButton">{t("login.button.login")}</button>
                <div className="no-account-message"><p>{t("login.hasnoAccount")} <a className="no-account-message-button" onClick={() => setSignUpForm(true)}>{t("login.button.signUp")}</a></p></div>
                <div className="errorMessages">
                {emailError && <p>{emailError}</p>}
                {passwordError && <p>{passwordError}</p>}
                </div>
                <div className="signInSuccess">
                    {statusMessage && <p>{statusMessage}</p>}
                </div>
            </form>}
        </>
    )
}

export default LoginPage;