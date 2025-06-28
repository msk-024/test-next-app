"use client";
import React, { useEffect, useState } from "react";
import { PageTitle } from "@/app/_components/PageTitle";
import { Post, Category } from "@/app/_types/AdminPost";
import { CategoryPost } from "./_components/CategoryPost";

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryPosts, setCategoryPosts] = useState<Map<number, Post[]>>(
    new Map()
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories"); // カテゴリーAPIの取得
      const { categories } = await res.json();
      setCategories(categories);
    };
    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      const { posts } = await res.json(); // 記事データを取得
      const categoryMap = new Map<number, Post[]>();

      posts.forEach((post: Post) => {
        post.postCategories.forEach((postCategory) => {
          const categoryId = postCategory.category.id;
          if (!categoryMap.has(categoryId)) {
            categoryMap.set(categoryId, []);
          }
          categoryMap.get(categoryId)?.push(post);
        });
      });

      setCategoryPosts(categoryMap);
    };

    fetchCategories();
    fetchPosts();
  }, []);

  return (
    <div className="mx-auto w-4/5 pl-5">
      <PageTitle ttl="カテゴリー一覧" />
      {categories.map((category) => (
        <CategoryPost
          key={category.id}
          category={category}
          categoryPosts={categoryPosts}
        />
      ))}
    </div>
  );
};

export default CategoryPage;
