import { MicroCmsPost } from "@/src/app/_types/MicroCmsPost";
import Image from "next/image";

// Articleコンポーネントを非同期にする →Next.jsでは不要
export default async function Article({ params }: { params: { id: string } }) {
  // const { id } = await params;
  // →Next.jsでは不要
  const { id } = params;

  // const res = await fetch(
  //   `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
  // );
  // const data = await res.json();

  // APIが失敗した場合、ページ全体がクラッシュする可能性あり。これを防ぐために try-catch を追加。
  let article: MicroCmsPost | null = null;

  try {
    const res = await fetch(
      `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
    );

    if (!res.ok) {
      if (res.status === 404) {
        return <p>記事が見つかりませんでした。</p>;
      }
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    article = data.post || null;
  } catch (error) {
    console.error("記事取得エラー:", error);
    return (
      <p>記事の読み込みに失敗しました。ネットワークを確認してください。</p>
    );
  }

  if (!article) {
    return <p>記事を読み込んでいます....</p>;
  }

  return (
    <div>
      <main>
        <div className="max-w-full w-4/5 mx-auto">
          <div className="w-full my-8">
            <Image
              src={article.thumbnailUrl?.url ?? "/default.jpg"}
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
              {article.categories.map((category) => (
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
            <h2 className="font-medium text-2xl mb-4">{article.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </div>
      </main>
    </div>
  );
}
