import { Post } from "@/src/types/Post";
import Image from "next/image";

// Articleコンポーネントを非同期にする
export default async function Article({ params }: { params: { id: string } }) {
  const{id} = await params;
  const res = await fetch(
    `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
  );
  const data = await res.json();

  // データがない場合はnull
  const article: Post | null = data.post || null;

  if (!article) {
    return <p>記事を読み込んでいます....</p>;
  }

  return (
    <div>
      <main>
        <div className="max-w-full w-4/5 mx-auto">
          <div className="w-full my-8">
            <Image
              src={article.thumbnailUrl}
              alt={article.title}
              width={800}
              height={450}
              className="w-full"
              priority // 優先的に読み込むようにする
            />
          </div>
          <div className="flex justify-between">
            <p className="text-xs">
              {new Date(article.createdAt).toLocaleDateString()}
            </p>
            <div className="flex">
              {article.categories.map((category, i) => (
                <p
                  key={i}
                  className="border border-blue-500 rounded text-blue-500 p-2 ml-1"
                >
                  {category}
                </p>
              ))}
            </div>
          </div>
          <div className="my-5">
            <h2 className="font-medium text-2xl mb-4">{article.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </div>
      </main>
    </div>
  );
}
