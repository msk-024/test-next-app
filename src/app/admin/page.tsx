"use client";

import { useEffect, useState } from "react";
import classes from "@/app/_styles/sass/Detail.module.scss";
import { AdminLayout } from "@/app/admin/posts/_components/AdminLayout";
import { ButtonGroup } from "@/app/_components/ButtonGroup";
import { Post } from "@/app/_types/MicroCmsPost";

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const res = await fetch(
  //         "https://9samplena9.microcms.io/api/v1/blog-next9",
  //         {
  //           headers: {
  //             "X-MICROCMS-API-KEY": process.env
  //               .NEXT_PUBLIC_MICROCMS_API_KEY as string,
  //           },
  //         }
  //       );

  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //       }

  //       const data = await res.json();
  //       const formatted: Post[] = data.contents.map((item: MicroCmsPost) =>
  //         convertToPost(item)
  //       );
  //       setPosts(formatted);
  //     } catch (error) {
  //       console.error("記事取得に失敗しました", error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/posts`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setPosts(data.posts); // APIの戻り値に合わせて
      } catch (error) {
        console.error("記事取得に失敗しました", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={classes.mainWrapper}>
      <ButtonGroup />
      <AdminLayout posts={posts} />
    </div>
  );
}
