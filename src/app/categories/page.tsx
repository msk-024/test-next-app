"use client";

import React, { useEffect, useState } from "react";
import { PageTitle } from "@/app/_components/PageTitle";
import { Post, Category } from "@/app/_types/AdminPost";
import { ViewerCategoryPost } from "./_components/ViewerCategoryPost";

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryPosts, setCategoryPosts] = useState<Map<number, Post[]>>(
    new Map()
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const { categories } = await res.json();
      setCategories(categories);
    };

    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      const { posts } = await res.json();

      const map = new Map<number, Post[]>();
      posts.forEach((post: Post) => {
        post.postCategories.forEach((pc) => {
          const id = pc.category.id;
          if (!map.has(id)) map.set(id, []);
          map.get(id)?.push(post);
        });
      });
      setCategoryPosts(map);
    };

    fetchCategories();
    fetchPosts();
  }, []);

  return (
    <div className="mx-auto w-4/5 pl-5">
      <PageTitle ttl="カテゴリー一覧" />
      {categories.map((category) => (
        <ViewerCategoryPost
          key={category.id}
          category={category}
          categoryPosts={categoryPosts}
        />
      ))}
    </div>
  );
};

export default CategoryPage;
