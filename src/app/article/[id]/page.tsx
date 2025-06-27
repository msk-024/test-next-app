"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Post } from "@/app/_types/AdminPost";
import Image from "next/image";

export default function Article() {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/posts/${id}`
        );

        if (!res.ok) throw new Error("投稿の取得に失敗しました");

        const data = await res.json();
        setPost(data.post);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (!id) {
    return <p className="text-red-500">記事IDが取得できません。</p>;
  }

  if (loading) {
    return <p>記事を読み込んでいます....</p>;
  }

  if (!post) {
    return <p>記事が見つかりません。</p>;
  }

  return (
    <div>
      <div className="max-w-full w-4/5 mx-auto">
        <div className="w-full my-8">
          {post.thumbnailUrl ? (
            <Image
              src={post.thumbnailUrl}
              alt={post.title}
              width={800}
              height={450}
              className="w-full"
              priority
            />
          ) : (
            <div>サムネイルが読み込まれませんでした</div>
          )}
        </div>

        <div className="flex justify-between">
          <p className="text-xs">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <div className="flex">
            {post.postCategories.map((pc, i) => (
              <p
                key={i}
                className="border border-blue-500 rounded text-blue-500 p-2 ml-1"
              >
                {pc.category.name}
              </p>
            ))}
          </div>
        </div>

        <div className="my-5">
          <h2 className="font-medium text-2xl mb-4">{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </div>
  );
}
