"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const tabs = ["Privacy Policy", "Terms & Condition", "About Us"];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [content, setContent] = useState([
    "<p>Edit your <b>Privacy Policy</b> here.</p>",
    "<p>Edit your <b>Terms & Conditions</b> here.</p>",
    "<p>Edit your <b>About Us</b> here.</p>",
  ]);

  const joditConfig = {
    readonly: false,
    height: 400,
    toolbarAdaptive: false,
    toolbarSticky: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    buttons: [
      "font",
      "fontsize",
      "bold",
      "italic",
      "underline",
      "|",
      "ul",
      "ol",
      "|",
      "align",
      "outdent",
      "indent",
      "|",
      "undo",
      "redo",
    ],
    style: {
      font: [
        "Arial",
        "Verdana",
        "Georgia",
        "Times New Roman",
        "Courier New",
        "Tahoma",
        "Comic Sans MS",
        "Impact",
      ],
    },
  };

  const handleSave = () => {
    console.log(`${tabs[activeTab]} Data`, content[activeTab]);
    toast.success("Changes saved successfully!");
  };

  return (
    <main className="p-6 space-y-6 bg-white border-[1px] border-[#E5E7EB] rounded-xl grow">
      <h2 className="text-xl text-text-settings font-semibold leading-7 bg-white  rounded-xl w-full">
        Settings
      </h2>
      <section className="mx-auto bg-white rounded-xl">
        <div className="flex border-b border-border-setting mb-4">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === idx
                  ? "border-text-clicked2 text-text-settings-content"
                  : "border-transparent text-text-settings-content-inactive hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mb-4 px-4 py-2">
          <h2 className="text-xl font-semibold">{tabs[activeTab]}</h2>
          <p className="text-sm text-muted-foreground">Dec 4, 2019 21:42</p>
        </div>

        <div className="rounded-md px-4 py-2">
          <JoditEditor
            value={content[activeTab]}
            config={joditConfig}
            onBlur={(newContent) => {
              const updated = [...content];
              updated[activeTab] = newContent;
              setContent(updated);
            }}
          />
        </div>

        <div className="mt-6">
          <Button
            onClick={handleSave}
            className="w-full bg-gradient-to-b from-button to-button2 hover:bg-green-700 text-white"
          >
            Save Changes
          </Button>
        </div>
      </section>
    </main>
  );
}
