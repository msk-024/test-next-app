"use client";

import { MainPost } from "@/app/_components/MainPost";
import { PageTitle } from "@/app/_components/PageTitle";
import { Post } from "@/app/_types/MicroCmsPost";

interface AdminLayoutProps {
  posts: Post[];
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ posts }) => {
  return (
    <div className="mx-auto w-4/5 pl-5">
      <div className="flex justify-between items-center">
        <PageTitle ttl="記事一覧" />
        <button>新規作成</button>
      </div>
      {posts.map((post) => (
        <MainPost key={post.id} post={post} />
      ))}
    </div>
  );
};
