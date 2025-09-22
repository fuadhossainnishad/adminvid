"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiList from "@/services/apiList";
import apiCall, { TMethods } from "@/services/apiMethodList";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    console.log("Email:", data.email);
    router.push("/verify-otp");
    sessionStorage.setItem("email", data.email);
    const res = await apiCall(TMethods.post, apiList.forgotPassword, data);
    console.log(res);

    if (!res.success) {
      toast.error("Otp sent failed");
      setSent(false);
      return;
    }

    sessionStorage.setItem("token", res.data.token);
    toast.success("Otp sent to your email");
    router.push("/verify-otp");
  };

  return (
    <form
      className="space-y-6 w-full flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-2 w-full">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#5C5C5C]"
        >
          Email address
        </label>
        <Input
          id="email"
          type="email"
          {...register("email", { required: "Email is required" })}
          className="h-12 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">
            {errors.email.message as string}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="h-10 px-[20px] py-[10px] rounded-md bg-gradient-to-b from-[#1C75AD] to-[#083D70]  text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        onClick={() => setSent(true)}
      >
        {sent ? "Otp Sending..." : "Send Otp"}
      </Button>
    </form>
  );
}
