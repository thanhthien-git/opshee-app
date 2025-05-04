import React from "react";
import { useAppSelector } from "@/redux/store";

const PreLoader = () => {
  const loading = useAppSelector((state) => state.loadingReducer.isLoading) 

  return (
    loading && (
      <div className="fixed left-0 top-0 z-999999 flex h-screen w-screen items-center justify-center bg-white">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-orange-light-1 border-t-transparent"></div>
      </div>
    )
  );
};

export default PreLoader;
