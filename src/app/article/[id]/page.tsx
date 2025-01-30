"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // useParamsをインポート
import { MicroCmsPost } from "@/src/app/_types/MicroCmsPost";
import Image from "next/image";

export default function Article() {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [post, setPost] = useState<MicroCmsPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      const res = await fetch(
        `https://9samplena9.microcms.io/api/v1/blog-next9/${id}`,
        {
          headers: {
            "X-MICROCMS-API-KEY": process.env
              .NEXT_PUBLIC_MICROCMS_API_KEY as string,
          },
        }
      );

      const data = await res.json();

      // console.log("Fetched data:", data); // データ全体を表示
      // console.log("Thumbnail:", data.thumbnail); // サムネイル情報を確認
      // console.log("Thumbnail URL:", data.thumbnail?.url); // URLを確認

      setPost(data);
      setLoading(false);
    };

    fetcher();
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

  const thumbnailUrl = post.thumbnail?.url;
  // console.log("Thumbnail URL:", post.thumbnailUrl?.url);

  return (
    <div>
      <main>
        <div className="max-w-full w-4/5 mx-auto">
          <div className="w-full my-8">
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
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
              {post.categories.map((category) => (
                <p
                  key={category.id}
                  className="border border-blue-500 rounded text-blue-500 p-2 ml-1"
                >
                  {category.name}
                </p>
              ))}
            </div>
          </div>
          <div className="my-5">
            <h2 className="font-medium text-2xl mb-4">{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </main>
    </div>
  );
}
