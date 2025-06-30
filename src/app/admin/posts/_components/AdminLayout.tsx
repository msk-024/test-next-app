"use client";
import Link from "next/link";
import { MainPost } from "@/app/_components/MainPost";
import { PageTitle } from "@/app/_components/PageTitle";
import { Post } from "@/app/_types/AdminPost";

interface AdminLayoutProps {
  posts: Post[];
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ posts }) => {
  return (
    <div className="mx-auto w-4/5 pl-5 bg-white text-black">
      <div className="flex justify-between items-center">
        <PageTitle ttl="記事一覧" />
        <Link href="/admin/posts/new/">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            新規作成
          </button>
        </Link>
      </div>
      {posts.map((post) => (
        <MainPost key={post.id} post={post} />
      ))}
    </div>
  );
};
