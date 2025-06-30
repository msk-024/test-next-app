import { Post, Category } from "@/app/_types/AdminPost";
import Link from "next/link";

interface ViewerCategoryPostProps {
  category: Category;
  categoryPosts: Map<number, Post[]>;
}

export const ViewerCategoryPost: React.FC<ViewerCategoryPostProps> = ({
  category,
  categoryPosts,
}) => {
  const posts = categoryPosts.get(category.id) || [];

  return (
    <div className="mb-10" id={`category-${category.id}`}>
      <h2 className="text-xl text-blue-300 mb-6">{category.name}</h2>
      <div className="space-y-4 mb-2">
        {posts.map((post) => (
          <Link key={post.id} href={`/article/${post.id}`}>
            <div className="mb-2 border border-gray-300 p-4 rounded hover:bg-gray-100">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <h3 className="text-lg font-semibold mt-2">{post.title}</h3>
              <div
                className="line-clamp-2 text-sm mt-1"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
