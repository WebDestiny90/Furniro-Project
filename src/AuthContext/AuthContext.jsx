import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setIsAuth(true);
        setCurrentUser(user);
      } else {
        setIsAuth(false);
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const refreshUser = useCallback(async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      setCurrentUser({ ...auth.currentUser });
    }
  }, []);

  const login = useCallback(() => {
    if (auth.currentUser?.emailVerified) {
      setIsAuth(true);
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuth(false);
    setCurrentUser(null);
  }, []);

  const value = useMemo(
    () => ({ isAuth, login, logout, currentUser, refreshUser }),
    [isAuth, login, logout, currentUser, refreshUser]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};