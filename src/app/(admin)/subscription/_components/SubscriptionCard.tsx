import Image from "next/image";
import React from "react";
import { ISubscription } from "./Data";

export default function SubscriptionCard({
  subs,
  setFunc,
  setSub,
}: {
  subs: ISubscription;
  setFunc: React.Dispatch<React.SetStateAction<boolean>>;
  setSub: React.Dispatch<React.SetStateAction<ISubscription>>;
}) {
  return (
    <main className="shadow-lg gap-3 border-[1px] border-border rounded-xl px-14 py-8 text-subs2 grow flex flex-col ">
      <h1 className="text-subs font-semibold text-2xl">
        {subs["Subscription Name"]}
      </h1>
      <div className="flex gap-3 items-end">
        <h1 className="text-subs font-bold text-[40px]">
          {"$"}
          {subs.Price}
        </h1>
        <h1 className="text-subs font-semibold text-[20px]">
          {subs["Billing Cycle"]}
        </h1>
      </div>
      <section className="space-y-1 flex-1 items-center">
        {subs["Short Description"].map((feat, ind) => (
          <div className="flex gap-3" key={ind}>
            <Image
              src="/assets/icons/subs/list.svg"
              alt="list"
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <h1 className="">{feat}</h1>
          </div>
        ))}
      </section>
      <section className="flex gap-8 w-full">
        <button
          className="grow bg-gradient-to-b from-button to-button2 text-white rounded-lg py-2"
          onClick={() => {
            setFunc(true);
            setSub(subs);
          }}
        >
          Edit
        </button>
        <button className="grow bg-button-delete/10 text-button-delete rounded-lg py-2">
          Delete
        </button>
      </section>
    </main>
  );
}
