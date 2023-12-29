import { useState } from "react";
import { apiClient } from "./apiClient";
import { useToast } from "@chakra-ui/react";

export interface UserInterface {
  email: string;
}

export interface ContextInterface {
  user: UserInterface | null;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
  token: string | null;
  setToken: (val: string) => void;
}

export const useAuthContext = () => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const toast = useToast();

  const login = async (email: string, password: string) => {
    await apiClient
      .post("/login", {}, { auth: { username: email, password: password } })
      .then((res) => {
        localStorage.setItem("accesToken", res.data);
        setToken(res.data);
      })
      .catch((err) =>
        toast({
          title: "Oops",
          description: "Could not login!",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      );
  };

  const register = async (email: string, password: string) => {
    await apiClient
      .post("/accounts", { email, password })
      .then(async (res) => {
        await login(email, password);
      })
      .catch((err) =>
        toast({
          title: "Oops",
          description: "Could not register!",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      );
  };

  const logout = () => {
    localStorage.removeItem("accesToken");
    setToken(null);
    setUser(null);
  };

  return { user, login, register, token, setToken, logout };
};
