import { MicroCmsPost } from "@/src/app/_types/MicroCmsPost";
import { MicroCmsCategory } from "@/src/app/_types/MicroCmsCategory";
import Link from "next/link";

interface CategoryPostProps {
  category: MicroCmsCategory;
  categoryPosts: Map<string, MicroCmsPost[]>;
}

export const CategoryPost: React.FC<CategoryPostProps> = ({ category, categoryPosts }) => {
  const posts = categoryPosts.get(category.name) || []; // category.name で記事を取得

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold">{category.name}</h2>
      <div className="mt-4">
        {posts.map((post) => (
          <div key={post.id} className="border border-black mb-4 w-4/5 mx-auto">
            <Link href={`/article/${post.id}`}>
              <div className="p-5">
                <div className="flex justify-between">
                  <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                  <div className="flex">
                    {post.postCategories.map((postCategory, i) => (
                      <p key={i} className="border border-blue-500 rounded text-blue-500 p-2 ml-1">
                        {postCategory.category.name}
                      </p>
                    ))}
                  </div>
                </div>
                <h2 className="font-medium text-2xl mb-4">{post.title}</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="line-clamp-2"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
