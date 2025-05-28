import "./Account.css";
import Features from "../../components/Features/Features";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext/AuthContext";
import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Account = () => {
  const { isAuth, login, logout } = useAuth();
  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/profile");
    }
  }, [isAuth, navigate]);

  // Регистрация
  const handleRegister = async (e) => {
    e.preventDefault();
    const [email, password] = [e.target[0].value, e.target[1].value];
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Отправляем email для подтверждения
      await sendEmailVerification(userCredential.user);
      // Выходим из аккаунта после регистрации
      await signOut(auth);
      setRegisterError("");
      setRegisterSuccess(true);
      // Переключаемся на форму логина через 3 секунды
      setTimeout(() => {
        setRegisterSuccess(false);
        setIsLoginForm(true);
      }, 3000);
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  // Вход
  const handleLogin = async (e) => {
    e.preventDefault();
    const [email, password] = [e.target[0].value, e.target[1].value];
    try {
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Проверяем, подтвержден ли email
      if (!userCredential.user.emailVerified) {
        setLoginError("Please verify your email before logging in.");
        await signOut(auth);
        return;
      }

      setLoginError("");
      login();
    } catch (error) {
      setLoginError("Invalid email or password!");
    }
  };

  // Выход
  const handleLogout = async () => {
    await signOut(auth);
    logout();
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <main className="accounPage">
      <div className="accountItems">
        <div className="container">
          <img className="logoImage" src="/assets/img/icons/siteLogo.svg" width={55} height={55} alt="Site Logo" />
          <h1 className="accountTitle">My Account</h1>
          <div className="accountTextsBox">
            <Link className="homeText" to="/">Home</Link>
            <img className="arrowImage" src="/assets/img/icons/arrow.svg" width={20} height={20} alt="Arrow Icon" />
            <p className="accountText">My Account</p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="accountContainer">
          {isAuth ? (
            <div style={{ width: "100%", textAlign: "center" }}>
              <div style={{ color: "green", marginBottom: "1rem" }}>You are logged in!</div>
              <button className="logInButton" onClick={handleLogout}>Log out</button>
            </div>
          ) : (
            <div className="authWrapper">
              <div className={`furnitureImage ${isLoginForm ? 'left' : 'right'}`}>
                <img
                  src={isLoginForm ? "/assets/img/reg_img.jpg" : "/assets/img/login_img.jpg"}
                  alt="Furniture"
                />
              </div>
              <div className={`formSection ${isLoginForm ? 'right' : 'left'}`}>
                {isLoginForm ? (
                  <LoginForm
                    handleLogin={handleLogin}
                    loginError={loginError}
                    rememberMe={rememberMe}
                    setRememberMe={setRememberMe}
                  />
                ) : (
                  <RegisterForm
                    handleRegister={handleRegister}
                    registerError={registerError}
                    registerSuccess={registerSuccess}
                    onToggleForm={toggleForm}
                  />
                )}
                <button
                  className="toggleFormButton"
                  onClick={toggleForm}
                  style={{ marginTop: '1rem' }}
                >
                  {isLoginForm ? "Don't have an account? Register" : "Already have an account? Log in"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Features />
    </main>
  );
};

export default Account;