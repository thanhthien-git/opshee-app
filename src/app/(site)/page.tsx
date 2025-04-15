import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Opshee",
  description: "Home",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
