"use client";
import React, { useEffect, useState } from "react";
import { PageTitle } from "@/src/app/_components/PageTitle";
import { MicroCmsPost } from "@/src/app/_types/MicroCmsPost";
import { MicroCmsCategory } from "@/src/app/_types/MicroCmsCategory";
import { CategoryPost } from "@/src/app/admin/categories/_components/CategoryPost";

export const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<MicroCmsCategory[]>([]);
  const [categoryPosts, setCategoryPosts] = useState<
    Map<string, MicroCmsPost[]>
  >(new Map());

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories"); // カテゴリーAPIの取得
      const { categories } = await res.json();
      setCategories(categories);
    };
    const fetchPosts = async () => {
      const res = await fetch("/api/posts");
      const { posts } = await res.json(); // 記事データを取得
      const categoryMap = new Map<string, MicroCmsPost[]>();

      posts.forEach((post: MicroCmsPost) => {
        post.postCategories.forEach((postCategory) => {
          const categoryName = postCategory.category.name;
          if (!categoryMap.has(categoryName)) {
            categoryMap.set(categoryName, []);
          }
          categoryMap.get(categoryName)?.push(post);
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
