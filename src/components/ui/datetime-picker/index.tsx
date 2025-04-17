"use client";

import React from "react";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

interface DatePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
}

const DatePicker = <T extends FieldValues>({
  name,
  control,
  rules,
}: DatePickerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <div className="relative w-full ">
            <div className="absolute left-3 top-3 text-orange-light-1 z-10">
              <CalendarDaysIcon className="w-5 h-5" />
            </div>

            <ReactDatePicker
              {...field}
              selected={field.value ? new Date(field.value) : null}
              onChange={(date: Date | null) => field.onChange(date)}
              placeholderText="Select date"
              dateFormat="yyyy-MM-dd"
              showPopperArrow={false}
              popperPlacement="bottom-start"
              className={`w-full py-3 px-10 border rounded-md text-sm outline-none transition-all
                ${
                  error
                    ? "border-or-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }
                 bg-white focus:border-b-orange-light-1 focus:border-b-4`}
              wrapperClassName="w-full"
            />
          </div>
          {error?.message && (
            <p className="text-sm text-red-500 mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default DatePicker;
