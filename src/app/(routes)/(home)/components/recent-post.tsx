import { getAllPost } from "@/actions/post";
import QueryProvider from "./query-provider";
import PostSkeleton from "@/components/card/skeleton";

const RecentPost = async () => {
  const posts = await getAllPost({ take: 10, status: "public" });
  if (!posts)
    return (
      <div className="w-full">
        <PostSkeleton total={5} />
      </div>
    );
  return <QueryProvider initialData={posts} />;
};

export default RecentPost;
