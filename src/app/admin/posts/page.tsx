"use client";

import { useEffect, useState } from "react";
import classes from "@/app/_styles/sass/Detail.module.scss";
import { AdminLayout } from "./_components/AdminLayout";
import { ButtonGroup } from "@/app/_components/ButtonGroup";
import { Post } from "@/app/_types/microCms/MicroCmsPost";

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);

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
