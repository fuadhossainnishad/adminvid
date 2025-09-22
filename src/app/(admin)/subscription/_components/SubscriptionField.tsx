"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ECycle, ISubscription } from "./Data";

export default function SubscriptionField({
  subs,
  setFunc,
}: {
  subs?: ISubscription;
  setFunc: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    register,
    // control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISubscription>({
    defaultValues: {
      "Subscription Name": subs?.["Subscription Name"] || "",
      "Billing Cycle": subs?.["Billing Cycle"] || ECycle.MONTHLY,
      "Short Description": subs?.["Short Description"] || [],
      Price: subs?.Price || 0,
    },
  });

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "Short Description",
  // });

  const [newFeature, setNewFeature] = useState("");

  // const handleAddFeature = () => {
  //   if (newFeature.trim() === "") return; // Prevent empty values from being added
  //   append(newFeature.trim()); // Add the new feature to the array
  //   setNewFeature(""); // Reset input field after adding
  // };

  const onSubmit = (data: ISubscription) => {
    console.log(data);
    if (subs) {
      console.log("Saving changes to existing subscription");
    } else {
      console.log("Creating new subscription");
    }
  };

  return (
    <main className="absolute bg-black/40 rounded-lg shadow-md w-full flex justify-center items-center py-[10%]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white shadow-lg rounded-lg w-1/3 p-8"
      >
        <section className="text-subs2 flex justify-between">
          <h1>{subs ? "Edit" : "Add"}</h1>
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

        <div className="">
          <label className="block text-base font-semibold">
            Subscription Name
          </label>
          <input
            type="text"
            {...register("Subscription Name", { required: true })}
            className="p-2 border rounded appearance-none outline-none border-border-subs w-full"
            placeholder="Subscription Name"
          />
          {errors["Subscription Name"] && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        <div>
          <label className="block text-base font-semibold">Billing Cycle</label>
          <select
            {...register("Billing Cycle", { required: true })}
            className="p-2 border rounded w-full text-subs2 appearance-none outline-none border-border-subs"
          >
            <option className="rounded" value={ECycle.ANNUAL}>
              {ECycle.ANNUAL}
            </option>
            <option className="rounded" value={ECycle.MONTHLY}>
              {ECycle.MONTHLY}
            </option>
          </select>
          {errors["Billing Cycle"] && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        <div>
          <label className="block text-base font-semibold">
            Short Description
          </label>
          <div className="flex space-x-2 items-center">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     handleAddFeature();
              //   }
              // }}
              className="p-2 border rounded w-full appearance-none outline-none border-border-subs"
              placeholder="Type a feature"
            />
          </div>

          {/* Show features below input */}
          {/* <div className="mt-2 space-y-2">
            {fields.map((item, index) => (
              <div key={item.id} className="flex items-center space-x-2">
                <span className="text-base">{field[index]}</span>
                <button
                  type="button"
                  onClick={() => remove(index)} // Remove feature on click
                  className="text-red-500"
                  aria-label="Remove feature" // Added aria-label for accessibility
                >
                  <Image
                    src="/assets/icons/cross.svg"
                    alt="remove"
                    width={16}
                    height={16}
                  />
                </button>
              </div>
            ))}
          </div> */}
        </div>

        <div className="w-full ">
          <label className="block text-base font-semibold">Price</label>
          <input
            type="text"
            {...register("Price", { required: true })}
            className="p-2 border rounded text-subs2 appearance-none outline-none border-border-subs w-full"
            placeholder="Subscription Name"
          />
          {errors["Price"] && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        <div className="">
          <button
            type="submit"
            className="mt-4 p-2 bg-gradient-to-b from-button to-button2 text-white rounded-lg font-semibold w-full"
          >
            {subs ? "Save" : "Create"}{" "}
          </button>
        </div>
      </form>
    </main>
  );
}
