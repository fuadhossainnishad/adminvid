import Image from "next/image";
import React from "react";
import { IRecentSignup } from "./UserTable";

export default function UserModal({
  data,
  setFunc,
}: {
  data: IRecentSignup;
  setFunc: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <main className="bg-black/60 rounded-lg shadow-md w-full top-0 flex justify-center items-center h-full absolute -mx-8">
      <section className="bg-white p-4 rounded-lg space-y-4">
        <section className="text-subs2 flex justify-between">
          <h1>User Details</h1>
          <Image
            src="/assets/icons/cross.svg"
            alt="cross"
            width={12}
            height={12}
            className="cursor-pointer"
            onClick={() => {
              setFunc(false);
            }}
          />
        </section>
        <section className=" justify-center flex flex-col space-y-4 px-4">
          <div className="flex flex-col items-center">
            <Image
              src={data.Name.photo}
              alt={data.Name.name}
              width={100}
              height={100}
              className="cursor-pointer"
              onClick={() => {
                setFunc(false);
              }}
            />
            <h1 className="text-2xl">{data.Name.name}</h1>
          </div>

          <div className="flex gap-1 w-full border-black/20 border-[1px] p-2 rounded-lg">
            <h1 className="font-semibold text-xs">Registration Date:</h1>
            <h1 className="font-normal text-xs">March 15, 2024</h1>
          </div>
          <div className="flex gap-1 w-full border-black/20 border-[1px] p-2 rounded-lg">
            <h1 className="font-semibold text-xs">Email Address:</h1>
            <h1 className="font-normal text-xs">{data.Email}</h1>
          </div>
        </section>
      </section>
    </main>
  );
}
