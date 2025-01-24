"use client";
import React, { useEffect, useState } from "react";
import { MainPost } from "@/src/app/post/MainPost";
import { PageTitle } from "@/src/app/_components/PageTitle";
import { Post, posts } from "@/src/app/_types/Post";

export const PostPage: React.FC = () => {
  const [postPages, setPostPages] = useState<Post[]>([]);

  // chapter9の記事取得処理
  // useEffect (()=>{
  // const fecher =async ()=>{
  // const res = await fecht ('<https://9samplena9.microcms.io/api/v1/blog-next9>',{
  // headers: {
  // 'X-MICROCMS-API-KEY :bvbCuz2LrHV23AsfSiP0DArHMeiNhxoH2Wo4',
  // },
  // })
  // const{contents}=await res.json()
  // setPosts(contents)
  // }
  // fetcher()
  // },[])
  // chapter9の記事取得処理ここまで

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
