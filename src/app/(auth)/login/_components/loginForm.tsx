"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import apiList from "@/services/apiList";
import apiCall, { TMethods } from "@/services/apiMethodList";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    console.log("Email:", data.email);
    console.log("Password:", data.password);
    router.push("/dashboard");

    const res = await apiCall(TMethods.post, apiList.login, data);
    console.log(res);

    if (!res.success) {
      toast.error("Wrong login credentials");
      return;
    }

    sessionStorage.setItem("token", res.data.token);
    toast.success("Signed in successfully");
    router.push("/dashboard");
  };

  return (
    <form
      className="space-y-6 items-center flex flex-col w-full"
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
      <div className="space-y-2 w-full">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            className="h-12 w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <EyeOffIcon className="w-5 h-5" />
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
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            className="h-4 w-4 rounded border-gray-300 text-white data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <label htmlFor="remember" className="text-sm text-secondary">
            Remember Password
          </label>
        </div>
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          Forgot Password?
        </Link>
      </div>
      <Button
        type="submit"
        className="h-10  px-[20px] py-[10px] rounded-md bg-gradient-to-b from-[#1C75AD] to-[#083D70]  text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Sign In
      </Button>
    </form>
  );
}
