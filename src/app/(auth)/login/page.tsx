import React from "react";
import LoginForm from "./_components/loginForm";

export default function LoginPage() {
  return (
    <main className="flex  items-center justify-center min-h-screen  text-[#FF6F61]">
 
      <section className="">
        <h1 className="text-7xl font-extrabold text-secondary font-urbanist leading-[108px] mb-[72px]">
          Login to Account
        </h1>
        <h1 className="text-[36px] font-bold text-secondary font-urbanist leading-[36px] mb-[36px]">
          Please enter your email and password to continue
        </h1>
        <LoginForm />

      </section>
    </main>
  );
}
