"use client";

import { useContext, useState } from "react";
import { Input } from "./input";
import { DataInterface } from "./types";
import { UserContext } from "../page";

export default function Login() {
  const userContext = useContext(UserContext);
  const [authState, setAuthState] = useState<"Login" | "Register">("Login");
  const [data, setData] = useState<DataInterface>({ email: "", password: "" });
  const [errors, setErrors] = useState<DataInterface>({
    email: "",
    password: "",
  });

  const handleChangeAuthState = () => {
    setAuthState(authState === "Login" ? "Register" : "Login");
  };

  const handleSubmit = () => {
    if (data.email === "" || data.password === "") {
      setErrors({
        email: data.email === "" ? "Error!" : "",
        password: data.password === "" ? "Error!" : "",
      });
    } else {
      userContext.login();
    }
  };

  return (
    <div className="w-screen h-screen flex flex-row items-center">
      <div className="h-screen w-1/2 overflow-hidden flex flex-col justify-evenly items-center pl-4">
        <div className="p-4">
          <h1 className="text-customBlue text-7xl font-black">WELCOME</h1>
          <p className="text-customBlue font-thin">
            Seamless Care, Endless Possibilities: Welcome to Our Virtual Healing
            Hub.
          </p>
        </div>
        <img src="/doctors.svg" alt="doctors image" />
      </div>
      <div className="relative h-screen w-1/2 flex flex-col items-center justify-center">
        <div className="relative h-1/3 flex flex-col justify-center">
          <h1 className="absolute top-0 left-0 text-customBlue text-4xl font-bold">
            {authState}
          </h1>
          <Input
            type="email"
            value={data.email}
            error={errors.email}
            setValue={(email) => {
              setData({ ...data, email });
            }}
          />
          <Input
            type="password"
            isLast
            value={data.password}
            error={errors.password}
            setValue={(password) => {
              setData({ ...data, password });
            }}
          />
          <button
            onClick={handleSubmit}
            className="absolute bottom-0 right-0 bg-customBlue text-white px-7 py-3 rounded-xl"
          >
            {authState}
          </button>
        </div>

        <div className="absolute flex flex-row bottom-4 text-customBlue">
          <p className="mr-1">
            {authState === "Login" ? "Don't" : "Already"} have an account?
          </p>
          <p
            className="font-bold underline cursor-pointer"
            onClick={handleChangeAuthState}
          >
            {authState === "Login" ? "Create one!" : "Login!"}
          </p>
        </div>
      </div>
    </div>
  );
}
