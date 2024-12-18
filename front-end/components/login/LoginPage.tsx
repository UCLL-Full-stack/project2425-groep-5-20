import UserService from "@/services/UserService";
import { Role } from "@/types";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";

const LoginPage: React.FC = () => {
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
            setNameError('Name is required.');
            result = false;
        }
        if (password.trim() === '' || password.length < 8) {
            setPasswordError('Password should be at least 8 characters.');
            result = false;
        }
        if (email.trim() === '' || !emailRegex.test(email)) {
            setEmailError("Email should be a valid email.")
            result = false;
        }
        if (selectedOption.trim() === '') {
            setSelectedOptionError("You should choose one of the two options.")
            result = false;
        }

        return result;

    }

    const validationLogIn = (): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let result = true;

        if (password.trim() === '' || password.length < 8) {
            setPasswordError('Password should be at least 8 characters.');
            result = false;
        }
        if (email.trim() === '' || !emailRegex.test(email)) {
            setEmailError("Email should be a valid email.")
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
            setEmailError("User with this email already exists.");
            return;
        }


        localStorage.setItem("loggedInUser", JSON.stringify({
            token: response.token,
            name: response.name,
            email: response.email,
            role: response.role
          }));

        setStatusMessage('Successfully registered! Redirecting you to the homepage in 2 seconds...');
        setTimeout(() => {
            setStatusMessage('Successfully registered! Redirecting you to the homepage in 1 seconds...');
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
            setEmailError(user.message);
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify({
            token: user.token,
            name: user.name,
            email: user.email,
            role: user.role
          }));
        setStatusMessage('Successfully logged in! Redirecting you to the homepage in 2 seconds...');
        setTimeout(()=> {
            setStatusMessage('Successfully logged in! Redirecting you to the homepage in 1 seconds...');
        }, 1000)

        setTimeout(()=> {
            router.push('/');
        }, 2000)
        
    }

    return (
        <>
            {signUpForm && <form className="login" onSubmit={saveUser}>
                <div>
                <label id="name">Name</label>
                <input id="login-name" type="text" value={name} onChange={(event) => setName(event.target.value)} />
                </div>

                <div>
                <label id="email">Email</label>
                <input id="login-email" type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>

                <div>
                <label id="password">Password</label>
                <input id="login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>

                <div className="parentOrChild">
                <label id="parentOrChild">
                    Parent
                    <input 
                    type="radio"
                    value='parent'
                    checked={selectedOption === 'parent'}
                    onChange={(event) => setSelectedOption(event.target.value)}
                     />
                </label>
                <label id="parentOrChild">
                    Child
                    <input 
                    type="radio"
                    value='child'
                    checked={selectedOption === "child"}
                    onChange={(event) => setSelectedOption(event.target.value)}
                    />
                </label>
                </div>
                <button id="signInButton">Sign up</button>
                <div className="no-account-message"><p>Already have an account? <a className="no-account-message-button"  onClick={() => setSignUpForm(false)}>Log in!</a></p></div>
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
                <label id="email">Email</label>
                <input id="login-email" type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>

                <div>
                <label id="password">Password</label>
                <input id="login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <button id="signInButton">Log in</button>
                <div className="no-account-message"><p>You don't have an account yet? <a className="no-account-message-button" onClick={() => setSignUpForm(true)}>Sign up!</a></p></div>
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