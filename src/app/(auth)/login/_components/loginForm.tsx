"use client";
import FormField from "@/utils/FormField";
import Image from "next/image";
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
        src="/assets/icons/emailBold.svg"
        alt="email"
        width={20}
        height={16}
      />,
    ],
    type: "email",
  },
  {
    name: "Password",
    title: "Password",
    placeholder: "Password",
    icon: [
      <Image
        key="lock"
        src="/assets/icons/lockBold.svg"
        alt="email"
        width={16}
        height={14}
      />,
      <Image
        key="view"
        src="/assets/icons/notViewBold.svg"
        alt="email"
        width={16}
        height={14}
      />,
    ],
    type: "password",
  },
];

export default function LoginForm() {
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
    router.push("/admin/dashboard");
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[22px] w-[422px] "
      >
        {LoginDataArray.map((data, ind) => (
          <FormField
            key={ind}
            name={data.name}
            title={data.title}
            placeHolder={data.placeholder}
            icon={data.icon}
            type={data.type}
          />
        ))}
        <div className="flex gap-3">
          <div className="rounded-lg border-[3px] border-[#FF6F61] w-6 h-6 "></div>
          <p className="font-bold leading-6">Remember me</p>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer rounded-2xl bg-[#ff6f61] font-urbanist text-white p-4 font-extrabold text-[20px] leading-[30px]"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </FormProvider>
  );
}
