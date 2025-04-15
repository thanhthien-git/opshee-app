import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  text: string;
}

export default function Button({
  className,
  text,
  isLoading,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button
      className={`${className} ${
        isLoading ? "opacity-70 cursor-not-allowed bg-gray-100" : ""
      }`}
      {...props}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex justify-center items-center gap-2">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-solid border-current border-t-transparent" />
        </div>
      ) : (
        text
      )}
    </button>
  );
}
