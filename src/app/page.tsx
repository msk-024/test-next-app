"use client";

// import { API_BASE_URL } from "@/src/constance";
import { useEffect, useState } from "react";
import classes from "@/app/_styles/sass/Detail.module.scss";
import { PostPage } from "@/app/_components/PostPage";
import { ButtonGroup } from "@/app/_components/ButtonGroup";
import {
  MicroCmsPost,
  Post,
  convertToPost,
} from "@/app/_types/microCms/MicroCmsPost";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          "https://9samplena9.microcms.io/api/v1/blog-next9",
          {
            headers: {
              "X-MICROCMS-API-KEY": process.env
                .NEXT_PUBLIC_MICROCMS_API_KEY as string,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        // if (!data.contents) {
        //   throw new Error("レスポンスに contents がありません");
        // }
        // const { contents }: { contents: MicroCmsPost[] } = await res.json();
        const formatted: Post[] = data.contents.map((item: MicroCmsPost) =>
          convertToPost(item)
        );
        setPosts(formatted);
      } catch (error) {
        console.error("記事取得に失敗しました", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={classes.mainWrapper}>
      <ButtonGroup />
      <PostPage posts={posts} />
    </div>
  );
}
