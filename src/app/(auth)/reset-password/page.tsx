import React from "react";
import Link from "next/link";
import ResetPasswordForm from "./_components/resetPasswordForm";
import Image from "next/image";

export default function ResetPasswordPage() {
  return (
    <main className="w-full space-y-7 items-center flex flex-col">
      <div className="space-y-5 text-center w-full flex flex-col items-center">
        <h1 className="text-2xl  font-bold text-[#103F73]  ">
          Reset Password
        </h1>
      </div>
      <ResetPasswordForm />
      <Link
        href="/login"
        className="flex gap-2 leading-5 font-normal text-sm text-[#667085]"
      >
        <Image
          key="email"
          src="/icons/downArrow.svg"
          alt="email"
          width={12}
          height={12}
          className="rotate-90"
        />
        <div>Back to log in</div>
      </Link>
    </main>
  );
}
