"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ISubscription, subscriptions } from "./_components/Data";
import SubscriptionCard from "./_components/SubscriptionCard";
import SubscriptionField from "./_components/SubscriptionField";

export default function SubscriptionPage() {
  const [create, setCreate] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [sub, setSub] = useState<ISubscription>({});

  // const handleSubCreate = async () => {
  //   router.push("/subscription/create");
  // };

  return (
    <main className={` relative flex justify-center w-full`}>
      <section
        className={`bg-white grow ${create === true ? "opacity-30" : ""} pb-10`}
      >
        <section
          className={`p-5 rounded-xl w-full flex justify-between items-center `}
        >
          <h2 className="text-lg font-semibold leading-7 ">
            Manage Subscription
          </h2>
          <div
            className="flex gap-5 bg-subs-add/40 p-4 rounded-lg cursor-pointer"
            onClick={() => setCreate(!create)}
          >
            <Image
              src="/assets/icons/subs/create.svg"
              alt="create"
              width={20}
              height={20}
              className=""
            />
            <h2 className="text-base text-subs-add-text font-semibold leading-7 ">
              Create Subscriprion Plan
            </h2>
          </div>
        </section>

        <section className="w-full flex gap-16 px-14">
          {subscriptions.map((sub, ind) => (
            <SubscriptionCard
              key={ind}
              subs={sub}
              setFunc={setEdit}
              setSub={setSub}
            />
          ))}
        </section>
      </section>
      {create && <SubscriptionField setFunc={setCreate} />}
      {edit && <SubscriptionField setFunc={setCreate} subs={sub} />}
    </main>
  );
}
