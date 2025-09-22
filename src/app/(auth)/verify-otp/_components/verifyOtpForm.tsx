"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apiList from "@/services/apiList";
import apiCall, { TMethods } from "@/services/apiMethodList";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function VerifyOtpForm() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isOtpResent, setIsOtpResent] = useState(false);
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const router = useRouter();

  useEffect(() => {
    inputRefs.current[0]?.focus();
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const verifyOtp = async (otp: string[]) => {
    if (!otp || otp.some((digit) => digit === "")) {
      toast.error("Please enter the complete OTP");
      return;
    }
          router.push("/reset-password");


    const res = await apiCall(TMethods.post, apiList.verifyOtp, {
      email: localStorage.getItem("email"),
      otp: otp.join(""),
    });

    if (!res.success) {

      toast.error(res.message || "Invalid OTP");
      return;
    }

    toast.success("OTP Verified Successfully!");
    router.push("/reset-password");
  };

  const resendOtp = async () => {
    setIsOtpResent(true);
    setTimer(59);

    const res = await apiCall(TMethods.post, apiList.verifyOtp, {
      email: localStorage.getItem("email"),
    });

    if (!res.success) {
      toast.error(res.message || "Failed to resend OTP");
      return;
    }

    toast.success("OTP has been resent to your email");
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <main className="items-center justify-center gap-7 flex flex-col w-full">
      <div className="flex gap-2 justify-center">
        {otp.map((digit, idx) => (
          <Input
            key={idx}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            ref={(el) => {
              inputRefs.current[idx] = el as HTMLInputElement;
            }}
            className="h-[10%] aspect-square text-center text-2xl font-semibold border-2 border-[#103F73] rounded-md focus-visible:ring-2"
          />
        ))}
      </div>
      <div className="w-full flex">
        <p className="text-center text-sm text-[#103F73] ">
          {timer > 0 ? (
            `Resend OTP in ${timer}s`
          ) : (
            <p>
              You can{" "}
              <span
                onClick={resendOtp}
                className="cursor-pointer text-[#103F73] underline"
              >
                Resend OTP
              </span>{" "}
              now
            </p>
          )}
        </p>
      </div>

      {/* {timer === 0 && !isOtpResent && (
        <Button
          type="button"
          className="cursor-pointer h-10 px-[20px] py-[10px] rounded-md bg-gradient-to-b from-[#1C75AD] to-[#083D70] text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          onClick={resendOtp}
        >
          Resend OTP
        </Button>
      )} */}
      <Button
        type="button"
        className="h-10  px-[30px] py-[10px] rounded-md bg-gradient-to-b from-[#1C75AD] to-[#083D70]  text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        onClick={() => verifyOtp(otp)}
        disabled={timer === 0 || otp.some((digit) => digit === "")}
      >
        Verify OTP
      </Button>
    </main>
  );
}
