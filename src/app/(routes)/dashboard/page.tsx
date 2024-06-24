import { getAllPost } from "@/actions/post";
import { getAllReviews } from "@/actions/review";
import { getAllUsers, getMe } from "@/actions/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Film, TrendingUp, User } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage data on this website",
};

const DashboardComponent = async () => {
  const me = await getMe();
  if (!me) redirect("/");
  const isAdmin = me.role === "admin";
  const users = isAdmin ? await getAllUsers() : [];
  const posts = await getAllPost({});
  const reviews = await getAllReviews();

  return (
    <div className="grid w-full gap-4 md:grid-cols-3">
      {isAdmin && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <User className="text-omsetro h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(users?.length ?? 0)}
            </div>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Posts</CardTitle>
          <Film className="text-omsetro h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatNumber(posts?.length ?? 0)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reviews</CardTitle>
          <TrendingUp className="text-omsetro h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatNumber(reviews?.length ?? 0)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
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
