"use client";

import { useState } from "react";
import { Input } from "./input";
import { DataInterface } from "./types";

export default function Login() {
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
    setErrors({
      email: data.email === "" ? "Error!" : "",
      password: data.password === "" ? "Error!" : "",
    });
  };

  return (
    <div className="w-screen h-screen flex flex-row items-center">
      <div className="h-screen w-1/2 overflow-hidden">
        <img src="/login-cat.png" alt="cat on purple background" />
      </div>
      <div className="relative h-screen w-1/2 flex flex-col items-center justify-center">
        <div className="absolute top-0 left-0 h-fit w-fit p-4 px-8 bg-darkPurple rounded-br-3xl">
          <h1 className="text-slate-50 text-5xl font-bold">WELCOME</h1>
        </div>

        <div className="relative h-1/3 flex flex-col justify-center">
          <h1 className="absolute top-0 left-0 text-darkPurple text-4xl font-bold">
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
            className="absolute bottom-0 right-0 bg-darkPurple text-white px-7 py-3 rounded-xl"
          >
            {authState}
          </button>
        </div>

        <div className="absolute flex flex-row bottom-4 text-darkPurple">
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
