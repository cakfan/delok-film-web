import type { Metadata } from "next";
import { Suspense } from "react";
import DashboardComponent from "./components/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage data on this website",
};

export default async function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-10 p-10 lg:px-20">
      <div className="prose dark:prose-invert">
        <h1 className="mb-2">Dashboard</h1>
        <p className="my-0">Manage data on this website</p>
      </div>
      <Suspense fallback={<p>Loading data</p>}>
        <DashboardComponent />
      </Suspense>
    </div>
  );
}
