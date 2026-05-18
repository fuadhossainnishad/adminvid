"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import Image from "next/image";

import { Pencil } from "lucide-react";

import { useProfile } from "@/utils/hooks/useProfile";
import { useAuth } from "@/utils/context/Auth.context";



export default function Profile() {
  const userId = useAuth().user?.id;
  const {
    profile: profileData,
    loading,
    updating,
    updateProfile,
  } = useProfile(Number(userId));

  /*
  |--------------------------------------------------------------------------
  | LOCAL UI STATE
  |--------------------------------------------------------------------------
  */

  const [activeTab, setActiveTab] =
    useState("profile");

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [profileImage, setProfileImage] =
    useState<string>(
      "/assets/images/profile.svg",
    );

  const [profile, setProfile] =
    useState({
      full_name: "",
      email: "",
    });

  const [passwords, setPasswords] =
    useState({
      current: "",
      new: "",
      confirm: "",
    });

  /*
  |--------------------------------------------------------------------------
  | SYNC API DATA
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!profileData) return;

    setProfile({
      full_name:
        profileData.full_name || "",
      email:
        profileData.email || "",
    });

    if (
      profileData.profile_picture
    ) {
      setProfileImage(
        profileData.profile_picture,
      );
    }
  }, [profileData]);

  /*
  |--------------------------------------------------------------------------
  | PROFILE INPUT CHANGE
  |--------------------------------------------------------------------------
  */

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | PASSWORD INPUT CHANGE
  |--------------------------------------------------------------------------
  */

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswords((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | IMAGE CHANGE
  |--------------------------------------------------------------------------
  */

  const handleProfileImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    const previewUrl =
      URL.createObjectURL(file);

    setProfileImage(previewUrl);
  };

  /*
  |--------------------------------------------------------------------------
  | SAVE PROFILE
  |--------------------------------------------------------------------------
  */

  const handleSaveProfile =
    async () => {
      const formData =
        new FormData();

      formData.append(
        "full_name",
        profile.full_name,
      );

      if (selectedFile) {
        formData.append(
          "profile_picture",
          selectedFile,
        );
      }

      await updateProfile(formData);
    };

  /*
  |--------------------------------------------------------------------------
  | LOADING STATE
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg font-medium">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="flex space-x-4">
          <div className="flex flex-col items-center text-center space-y-2 relative">

            {/* Profile Image */}

            <div className="relative w-24 h-24 rounded-full overflow-hidden">
              <Image
                src={profileImage}
                alt="Profile"
                fill
                className="rounded-full object-cover"
              />
            </div>

            <label
              htmlFor="profileImageUpload"
              className="absolute bottom-3 right-[calc(50%-48px)] z-20 bg-[#9333EA] p-1 rounded-full shadow-md cursor-pointer"
            >
              <Pencil className="text-white w-4 h-4" />

              <Input
                id="profileImageUpload"
                type="file"
                accept="image/*"
                placeholder=""
                className="hidden"
                onChange={
                  handleProfileImageChange
                }
              />
            </label>
          </div>

          <div className="space-y-2">
            <h2 className="text-start text-[26px] font-semibold">
              {profile.full_name}
            </h2>

            <p className="text-start text-xl">
              Admin
            </p>
          </div>
        </div>

        <div className="flex space-x-4 border-b border-gray-200 mt-4 mb-6">
          <button
            onClick={() =>
              setActiveTab(
                "profile",
              )
            }
            className={`pb-2 font-medium cursor-pointer ${activeTab ===
              "profile"
              ? "border-b-2 border-black"
              : "text-gray-500"
              }`}
          >
            Edit Profile
          </button>

          <button
            onClick={() =>
              setActiveTab(
                "password",
              )
            }
            className={`pb-2 font-medium cursor-pointer ${activeTab ===
              "password"
              ? "border-b-2 border-black"
              : "text-gray-500"
              }`}
          >
            Change Password
          </button>
        </div>
      </div>

      {/* PROFILE TAB */}

      {activeTab ===
        "profile" && (
          <div className="mt-6 space-y-4 flex flex-col px-12">
            <h3 className="text-center text-2xl font-medium">
              Edit Your Profile
            </h3>

            <div className="space-y-2 ">
              <Label>
                User Name
              </Label>

              <Input
                value={
                  profile.full_name
                }
                onChange={
                  handleProfileChange
                }
                name="full_name"
                placeholder="Enter your username"
                className="border-[1px] border-[#E5E7EB] appearance-none focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                value={
                  profile.email
                }
                disabled
                placeholder="Enter your email"
                name="email"
                type="email"
                className="border-[1px] border-[#E5E7EB] appearance-none focus:outline-none bg-gray-100"
              />
            </div>

            {/* EXTRA INFO */}

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-[#E5E7EB] rounded-lg p-4">
                <p className="text-sm text-gray-500">
                  Language
                </p>

                <p className="mt-1 font-medium">
                  {
                    profileData?.language
                  }
                </p>
              </div>

              <div className="border border-[#E5E7EB] rounded-lg p-4">
                <p className="text-sm text-gray-500">
                  Verified
                </p>

                <p className="mt-1 font-medium">
                  {profileData?.is_verified
                    ? "Yes"
                    : "No"}
                </p>
              </div>
            </div>

            <Button
              disabled={updating}
              className="bg-gradient-to-b from-button to-button2 text-white w-full"
              onClick={
                handleSaveProfile
              }
            >
              {updating
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </div>
        )}

      {/* PASSWORD TAB */}

      {activeTab ===
        "password" && (
          <div className="mt-6 space-y-4 flex flex-col px-12">
            <h3 className="text-center text-2xl font-medium">
              Change Password
            </h3>

            <div className="space-y-2">
              <Label>
                Current Password
              </Label>

              <Input
                type="password"
                name="current"
                value={
                  passwords.current
                }
                onChange={
                  handlePasswordChange
                }
                className="border-[1px] border-[#E5E7EB] appearance-none focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <Label>
                New Password
              </Label>

              <Input
                type="password"
                name="new"
                value={
                  passwords.new
                }
                onChange={
                  handlePasswordChange
                }
                className="border-[1px] border-[#E5E7EB] appearance-none focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <Label>
                Confirm Password
              </Label>

              <Input
                type="password"
                name="confirm"
                value={
                  passwords.confirm
                }
                onChange={
                  handlePasswordChange
                }
                className="border-[1px] border-[#E5E7EB] appearance-none focus:outline-none"
              />
            </div>

            <Button className="bg-gradient-to-b from-button to-button2 text-white w-full">
              Save Changes
            </Button>
          </div>
        )}
    </div>
  );
}