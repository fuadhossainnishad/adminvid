"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
interface DetailsModalProps {
  title?: string;
  companyDetails?: {
    name: string;
    email: string;
    leader: string;
    subscriptionPlan: string;
  };
  children: React.ReactNode;
}

interface FilterDialogProps {
  onApply?: (date: string) => void;
  onReset?: () => void;
  children: React.ReactNode;
}

export const Filter: React.FC<DetailsModalProps> = ({
  onApply,
  onReset,
  children,
}: FilterDialogProps) => {
  const [date, setDate] = useState<string>("");

  const handleReset = () => {
    setDate("");
    onReset?.();
  };

  const handleApply = () => {
    console.log("Applied filter with date:", date);
    onApply?.(date);
  };

  const handleDateReset = () => {
    setDate("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-80 top-[25%] right-18 left-auto translate-x-0 translate-y-0">
        <DialogHeader>
          <DialogTitle className="text-base text-[#727272] -mt-4">
            <Settings2 className="h-4 w-4 mr-2 inline-block" />
            Filter
          </DialogTitle>
        </DialogHeader>

        <div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-gray-700">Date</label>
              <button
                onClick={handleDateReset}
                className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
              >
                Reset
              </button>
            </div>

            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-7 [&::-webkit-calendar-picker-indicator]:top-1/2 [&::-webkit-calendar-picker-indicator]:-translate-y-1/2 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex-1 bg-[#D9D9D959] border-none"
            >
              Reset
            </Button>
            <Button
              onClick={handleApply}
              className="flex-1 bg-[#08692C] hover:bg-green-700 text-white"
            >
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
