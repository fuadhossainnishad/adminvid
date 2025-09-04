import React from "react";
import Link from "next/link";
import ResetPasswordForm from "./_components/resetPasswordForm";
import Image from "next/image";

export default function ResetPasswordPage() {
  return (
    <main className="gap-8 flex flex-col items-center justify-center min-h-screen  text-[#FF6F61] ">
      <div className="gap-6 flex flex-col items-center  w-[360px]">
        <Image
          key="email"
          src="/assets/icons/keyWithBg.svg"
          alt="email"
          width={56}
          height={56}
          className=""
        />
        <div className="gap-3 flex flex-col items-center">
          <h1 className="text-[30px] font-extrabold text-secondary font-urbanist leading-[38px]">
            Set new password
          </h1>
          <h1 className="text-[16px] text-center  text-[#667085] font-normal text-secondary font-urbanist leading-[24px]">
            Your new password must be different to previously used passwords.{" "}
          </h1>
        </div>
      </div>

      <ResetPasswordForm />

      <Link
        href="/forgot-password"
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
