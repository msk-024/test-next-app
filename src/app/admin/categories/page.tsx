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
      const res = await fetch("/api/categories");
      const { categories } = await res.json();
      setCategories(categories);
      const map = new Map<number, Post[]>();
      categories.forEach((category: Category) => {
        category.posts.forEach((cp) => {
          if (!map.has(category.id)) map.set(category.id, []);
          map.get(category.id)?.push(cp.post);
        });
      });
      setCategoryPosts(map);
    };

    fetchCategories();
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
