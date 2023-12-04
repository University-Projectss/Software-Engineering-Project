import { useState } from "react";

export interface UserInterface {
  email: string;
}

export interface ContextInterface {
  user: UserInterface | null;
  login: () => void;
  logout: () => void;
}

export const useAuthContext = () => {
  const [user, setUser] = useState<UserInterface | null>(null);

  const login = () => {
    setUser({ email: "user" });
  };

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout };
};
