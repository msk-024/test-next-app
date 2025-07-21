import React from "react";
import Link from "next/link";
import { Post } from "@/app/_types/AdminPost";

interface MainPostProps {
  post: Post;
}

export const MainPost: React.FC<MainPostProps> = ({ post }) => {
  return (
    <div className="border border-black mb-4 w-4/5 mx-auto">
      <Link href={`/article/${post.id}`}>
        <div className="p-5">
          <div className="flex justify-between">
            <p>{post.createdAt.slice(0, 10)}</p>
            <div className="flex">
              {post.postCategories.map((postCategory, i) => (
                <p
                  key={i}
                  className="border border-blue-500 rounded text-blue-500 p-2 ml-1"
                >
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
  );
};
