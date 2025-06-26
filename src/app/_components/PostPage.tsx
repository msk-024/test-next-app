"use client";

import { MainPost } from "@/app/_components/MainPost";
import { PageTitle } from "@/app/_components/PageTitle";
import { Post } from "@/app/_types/AdminPost";

interface PostPageProps {
  posts: Post[];
}

export const PostPage: React.FC<PostPageProps> = ({ posts }) => {
  return (
    <div className="mx-auto w-4/5 pl-5">
      <PageTitle ttl="記事一覧" />
      {posts.map((post) => (
        <MainPost key={post.id} post={post} />
      ))}
    </div>
  );
};
