import type { Metadata } from "next";
import { isSetup } from "@/actions/user";
import SetupForm from "./components/form";

export const metadata: Metadata = {
  title: "Setup Account",
  description: "You have to complete your account information",
};

export default async function SetupPage() {
  await isSetup({ isSetupPage: true });
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-6 p-6">
      <h1 className="text-3xl font-medium">Setup Your Account</h1>
      <SetupForm />
    </div>
  );
}
