"use client";
import React, { useEffect, useState } from "react";
import { MainPost } from "@/src/app/_components/MainPost";
import { PageTitle } from "@/src/app/_components/PageTitle";
// import { Post, posts } from "@/src/app/_types/Post";
import { MicroCmsPost } from "@/src/app/_types/MicroCmsPost";

export const PostPage: React.FC = () => {
  const [postPages, setPostPages] = useState<MicroCmsPost[]>([]);

  // chapter9の記事取得処理
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        "https://9samplena9.microcms.io/api/v1/blog-next9",
        {
          headers: {
            "X-MICROCMS-API-KEY": process.env
              .NEXT_PUBLIC_MICROCMS_API_KEY as string,
          },
        }
      );
      const { contents } = await res.json();
      setPostPages(contents);
    };
    fetcher();
  }, []);
  // chapter9の記事取得処理ここまで

  // useEffect(() => {
  //   setPostPages(posts);
  // }, []);

  return (
    <div className="mx-auto w-4/5">
      <PageTitle ttl="記事一覧" />
      {postPages.map((postPage) => (
        // <MainPost key={postPage.id} post={postPage} />
        <MainPost key={postPage.id} post={postPage} />
      ))}
    </div>
  );
};
