import React from "react";
import { Link } from "react-router-dom";
import { Post } from "./types/Post";

interface MainPostProps {
  post: Post;
}

export const MainPost: React.FC<MainPostProps> = ({ post }) => {
  return (
    <div className="border border-black mb-4 w-4/5 mx-auto">
      <Link to={`/article/${post.id}`}>
        <div className="p-5">
          <div className="flex justify-between">
            <p>{new Date(post.createdAt).toLocaleDateString()}</p>
            <div className="flex">
              {post.categories.map((category, i) => (
                <p
                  key={i}
                  className="border border-blue-500 rounded text-blue-500 p-2 ml-1"
                >
                  {category}
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
