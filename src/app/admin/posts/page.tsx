"use client";

import { useEffect, useState } from "react";
import classes from "@/app/_styles/sass/Detail.module.scss";
import { AdminLayout } from "./_components/AdminLayout";
import { ButtonGroup } from "@/app/_components/ButtonGroup";
import { Post } from "@/app/_types/AdminPost";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";


export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const {token} =useSupabaseSession();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!token) return;  
        const res = await fetch(
          `/api/admin/posts`,
          { cache: "no-store",  // キャッシュ回避ができる
            headers: {
              'Content-Type':'application/json',
              Authorization: token,
            },
      });
      
      const {posts} = await res.json();
      setPosts([...posts]);

      if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("記事取得に失敗しました", error);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <div className={classes.mainWrapper}>
      <ButtonGroup />
      <AdminLayout posts={posts} />
    </div>
  );
}
