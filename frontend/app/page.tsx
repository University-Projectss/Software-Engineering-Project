"use client";

import { createContext, useState } from "react";
import Home from "./home/page";
import Login from "./login/page";

interface UserInterface {
  email: string;
}

interface ContextInterface {
  user: UserInterface | null;
  login: () => void;
  logout: () => void;
}

export const UserContext = createContext<ContextInterface>({
  user: null,
  login: () => {},
  logout: () => {},
});

export default function Root() {
  const [user, setUser] = useState<UserInterface | null>(null);

  const login = () => {
    setUser({ email: "user" });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {!!user ? <Home /> : <Login />}
    </UserContext.Provider>
  );
}
