import React from "react";
import Link from "next/link";
import Image from "next/image";
import ForgotPasswordForm from "./_components/forgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main className="flex flex-col items-center justify-center gap-8 min-h-screen  text-[#FF6F61]">
      <h1 className="text-[30px] font-extrabold text-secondary font-urbanist leading-[38px]">
        Forgot password?
      </h1>

      <ForgotPasswordForm />
      <Link
        href="/login"
        className="flex gap-2 leading-5 font-normal text-sm text-[#667085]"
      >
        <Image
          key="email"
          src="/assets/icons/leftArrow.svg"
          alt="email"
          width={12}
          height={12}
        />
        <div>Back to log in</div>
      </Link>
    </main>
  );
}
