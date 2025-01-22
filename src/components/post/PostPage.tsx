"use client";
import React, { useEffect, useState } from "react";
import { MainPost } from "@/src/components/post/MainPost";
import { PageTitle } from "@/src/components/PageTitle";
import { Post, posts } from "@/src/types/Post";

export const PostPage: React.FC = () => {
  const [postPages, setPostPages] = useState<Post[]>([]);

  useEffect(() => {
    setPostPages(posts);
  }, []);

  return (
    <div className="mx-auto w-4/5">
      <PageTitle ttl="記事一覧" />
      {postPages.map((postPage) => (
        <MainPost key={postPage.id} post={postPage} />
      ))}
    </div>
  );
};
