import React, { useEffect, useState } from "react";
import { MainPost } from "./MainPost";
import { PageTitle } from "./PageTitle";
import { Post, posts } from "./types/Post";

export const PostPage: React.FC = () => {
  const [postPages, setPostPages] = useState<Post[]>([]); // 初期は空の配列にする
  useEffect(() => {
    setPostPages(posts);
  }, []);
  return (
    <div className="mx-auto w-4/5">
      <PageTitle ttl="記事一覧" />
      {postPages.map((postPage) => (
        <MainPost key={postPage.id} post={postPage} /> // postPages の各記事を表示
      ))}
    </div>
  );
};
