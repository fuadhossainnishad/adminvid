"use client";
import FormField from "@/utils/FormField";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export type TLogin = {
  email: string;
  password: string;
};

const LoginDataArray = [
  {
    name: "email",
    title: "Email Address",
    placeholder: "Email Address",
    icon: [
      <Image
        key="email"
        src="/assets/icons/email.svg"
        alt="email"
        width={20}
        height={16}
      />,
    ],
    type: "email",
    inputCls:
      "flex justify-between items-center p-5 rounded-xl gap-3 bg-[#EFEFEF]",
  },
];

export default function ForgotPasswordForm() {
  const router = useRouter();

  const methods = useForm<TLogin>({
    defaultValues: {
      email: "",
      password: "admin123",
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: TLogin) => {
    console.log(data);
    router.push("/verify-otp");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[22px] w-[360px] "
      >
        {LoginDataArray.map((data, ind) => (
          <FormField
            key={ind}
            name={data.name}
            title={data.title}
            placeHolder={data.placeholder}
            icon={data.icon}
            type={data.type}
            inputCls={data.inputCls}
          />
        ))}
        <section className="flex justify-between items-center">
          <div className="flex gap-3">
            <input
              id="remember-me"
              type="checkbox"
              placeholder=""
              className="rounded-lg border-[3px] border-[#FF6F61] w-6 h-6"
            />
            <label htmlFor="remember-me" className="font-bold leading-6">
              Remember Password
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="leading-6 font-bold text-[#262621] mt-[18px]"
          >
            Forgot password?
          </Link>
        </section>
        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer rounded-lg bg-[#ff6f61] font-urbanist text-[#F1F8FD] py-[10px] font-extrabold text-[16px] leading-[24px] mt-[10px]"
        >
          {isSubmitting ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </FormProvider>
  );
}
