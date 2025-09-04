"use client";
import FormField from "@/utils/FormField";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export type TVerifyOtp = {
  otp0: string;
  otp1: string;
  otp2: string;
  otp3: string;
};

export default function VerifyOtpForm() {
  const router = useRouter();
  const methods = useForm<TVerifyOtp>({
    defaultValues: {
      otp0: "",
      otp1: "",
      otp2: "",
      otp3: "",
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: TVerifyOtp) => {
    console.log(data);
    router.push("/reset-password");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[22px] w-[360px] "
      >
        <section className="flex justify-between">
          {Array.from({ length: 4 }).map((_, ind) => (
            <FormField
              key={ind}
              name={`otp${ind}`}
              type="text"
              inputCls="h-20 w-20 flex justify-center items-center p-2 rounded-lg bg-[#EFEFEF]"
              innerInputCls="text-5xl font-normal outline-none text-center w-full h-full"
              registerLogic={{
                maxLength: 1,
                pattern: /^[0-9]$/,
              }}
            />
          ))}
        </section>
        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer rounded-lg bg-[#ff6f61] font-urbanist text-[#F1F8FD] py-[10px] font-extrabold text-[16px] leading-[24px] mt-[10px]"
        >
          {isSubmitting ? "Verifying OTP..." : "Verify OTP"}
        </button>
      </form>
    </FormProvider>
  );
}
