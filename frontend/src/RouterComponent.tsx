import { useContext, useEffect, useState } from "react";
import { UserContext } from "./App";
import { Route, Routes } from "react-router";
import { Home } from "./components/home";
import { NotFound } from "./components/notFound";
import { Auth } from "./components/auth";
import { Flex, Spinner } from "@chakra-ui/react";
import { Profile } from "./components/profile";

export const RouterComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const auth = useContext(UserContext);

  useEffect(() => {
    const possibleToken = localStorage.getItem("accesToken");
    if (possibleToken) {
      auth.setToken(possibleToken);
    }
    setIsLoading(false);
  }, [auth.token]);

  return isLoading ? (
    <Flex height="100vh" alignItems="center" justify="center">
      <Spinner />
    </Flex>
  ) : auth.token != null ? (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/profile" element={<Profile /> } />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
