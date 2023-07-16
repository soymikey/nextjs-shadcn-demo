"use client";
import { getItem, setItem } from "@/lib/utils";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

interface ContextProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
  username: "",
  isLogin: false,
  setIsLogin: () => false,
  setUsername: () => "",
});

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");

  useLayoutEffect(() => {
    const initIsLogin = getItem<boolean>("isLogin") || false;
    const initUsername = getItem<string>("username") || "";
    setIsLogin(initIsLogin);
    setUsername(initUsername);
  }, []);

  useEffect(() => {
    setItem("isLogin", isLogin);
    setItem("username", username);
  }, [isLogin, username]);

  return (
    <GlobalContext.Provider
      value={{
        isLogin,
        setIsLogin,
        username,
        setUsername,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
