"use client";
import * as React from "react";
import { Controller, Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

interface IOpsheeInputProps<T extends FieldValues> extends React.ComponentProps<"input"> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
}

const Input = <T extends FieldValues>({
  name,
  className,
  type,
  control,
  rules,
  ...props
}: IOpsheeInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <input
            {...field}
            type={type}
            className={`rounded-lg border ${
              error ? "border-orange-light-1" : "border-gray-3"
            } bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-b-4 focus:border-b-orange-light-1 transition-colors ${className}`}
            {...props}
          />
          <div
            className={`overflow-hidden transition-all duration-200 ${
              error ? "max-h-6" : "max-h-0"
            }`}
          >
            <p
              className={`mt-1 text-sm text-orange-light-1 transition-opacity duration-200 ${
                error ? "opacity-100" : "opacity-0"
              }`}
            >
              {error?.message}
            </p>
          </div>
        </div>
      )}
    />
  );
};

export { Input };