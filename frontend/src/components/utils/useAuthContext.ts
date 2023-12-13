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
}

export const useAuthContext = () => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const toast = useToast();

  const login = async (email: string, password: string) => {
    await apiClient
      .post("/login", {}, { auth: { username: email, password: password } })
      .then((res) => {
        console.log(res.data);
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
    await apiClient.post("/accounts", { email, password }).then((res) => {});
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, register, logout };
};
