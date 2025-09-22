import React from "react";
import LoginForm from "./_components/loginForm";

export default function LoginPage() {
  return (
    <main className="space-y-7 w-full items-center">
      <div className="space-y-5 text-center w-full flex flex-col items-center">
        <h1 className="text-2xl  font-bold text-[#103F73]  ">
          Signin To Account
        </h1>
        <h1 className="text-sm font-normal text-wrap w-[60%] text-[#5C5C5C]  ">
          Please enter your email and password to continue
        </h1>
      </div>
      <LoginForm />
    </main>
  );
}
