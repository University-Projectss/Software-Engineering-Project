import { useContext } from "react";
import { UserContext } from "./App";
import { Route, Routes } from "react-router";
import { Home } from "./components/home";
import { NotFound } from "./components/notFound";
import { Auth } from "./components/auth";

export const RouterComponent = () => {
  const auth = useContext(UserContext);

  return auth.user ? (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
