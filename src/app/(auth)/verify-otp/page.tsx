import React from "react";
import Link from "next/link";
import Image from "next/image";
import VerifyOtpForm from "./_components/verifyOtpForm";

export default function VerifyOtpPage() {
  return (
    <main className="flex flex-col items-center justify-center gap-8 min-h-screen  text-[#FF6F61]">
      <div className="gap-3 flex flex-col items-center ">
        <h1 className="text-[30px] font-extrabold text-secondary font-urbanist leading-[38px]">
          Check your email
        </h1>
        <h1 className="text-[16px] text-[#667085] font-normal text-secondary font-urbanist leading-[24px]">
          We sent a verification link to your contact email
        </h1>
      </div>

      <VerifyOtpForm />

      <div className="flex gap-1 text-[14px] font-normal leading-5">
        <p className="text-[#667085]">Didn’t receive the email?</p>
        <button className="cursor-pointer">Click to resend</button>
      </div>

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
        <div>Back to Forgot password</div>
      </Link>
    </main>
  );
}
