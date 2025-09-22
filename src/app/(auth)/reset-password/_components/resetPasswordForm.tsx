"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiList from "@/services/apiList";
import apiCall, { TMethods } from "@/services/apiMethodList";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

export type TResetPassword = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const [sent, setSent] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    console.log("Email:", data.newPassword);
    console.log("Email:", data.confirmPassword);

    router.push("/login");
    sessionStorage.setItem("email", data.email);
    const res = await apiCall(TMethods.post, apiList.resetPassword, data);
    console.log(res);

    if (!res.success) {
      toast.error("Otp sent failed");
      setSent(false);
      return;
    }

    sessionStorage.setItem("token", res.data.token);
    toast.success("Otp sent to your email");
    router.push("/login");
  };

  return (
    <form
      className="space-y-6 w-full flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-2 w-full">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          New Password
        </label>
        <div className="relative">
          <Input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "New password is required" })}
            className="h-12 w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <EyeOffIcon className="w-5 aspect-square" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">
            {errors.password.message as string}
          </p>
        )}
      </div>
      <div className="space-y-2 w-full">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          New Password
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Confirm password is required",
            })}
            className="h-12 w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <EyeOffIcon className="w-5 aspect-square" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">
            {errors.password.message as string}
          </p>
        )}
      </div>
      <Button
        type="submit"
        className="h-10 px-[30px] py-[10px] rounded-md bg-gradient-to-b from-[#1C75AD] to-[#083D70]  text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        onClick={() => setSent(true)}
      >
        {sent ? "Password resetting..." : "Reset Password"}
      </Button>
    </form>
  );
}
