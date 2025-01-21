import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "./types/Post";

export function Article() {
  const { id } = useParams<{ id: string }>();
  // console.log("Article ID:", id);
  const [article, setArticle] = useState<Post | null>(null);

  useEffect(() => {
    const Articles = async () => {
      try {
        const response = await fetch(
          `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`
        );
        const data = await response.json();
        setArticle(data.post);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    Articles();
  }, [id]);

  if (!article) {
    return <p>記事を読み込んでいます....</p>;
  }

  return (
    <div>
      <main>
        <div className="max-w-full w-4/5 mx-auto">
          <div className="w-full my-8">
            <img
              src={article.thumbnailUrl}
              alt={article.title}
              className="w-full"
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

export default Article;
