"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import classes from "@/app/_styles/sass/Detail.module.scss";
import { PageTitle } from "@/app/_components/PageTitle";
import { Post, Category } from "@/app/_types/AdminPost";
import { CategoryPost } from "./_components/CategoryPost";
import { AdminButtonGroups } from "../_components/AdminButtonGroups";
import { useCategories } from "@/hooks/useCategories";

const CategoryPage: React.FC = () => {
  const [categoryPosts, setCategoryPosts] = useState<Map<number, Post[]>>(
    new Map()
  );

  const { categories, loading, error } = useCategories();
  useEffect(() => {
    if (!categories.length) return; //API変更時の保険として

    const map = new Map<number, Post[]>();
    categories.forEach((category: Category) => {
      if (!category.posts) return;

      category.posts.forEach((cp) => {
        if (!map.has(category.id)) map.set(category.id, []);
        map.get(category.id)?.push(cp.post);
      });
    });
    setCategoryPosts(map);
  }, [categories]);

  if (loading) return <p className="p-4">読み込み中...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className={classes.mainWrapper}>
      <AdminButtonGroups />
      <div className="mx-auto w-4/5 pl-5">
        <PageTitle ttl="カテゴリー一覧" />
        <div className="mb-4 text-right">
          <Link
            href="/admin/categories/new"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            新規作成
          </Link>
        </div>
        {categories.map((category) => (
          <CategoryPost
            key={category.id}
            category={category}
            categoryPosts={categoryPosts}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
