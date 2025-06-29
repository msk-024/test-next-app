"use client";

import React, { useEffect, useState } from "react";
import { PageTitle } from "@/app/_components/PageTitle";
import { Post, Category } from "@/app/_types/AdminPost";
import { ViewerCategoryPost } from "./_components/ViewerCategoryPost";
import { ButtonGroup } from "../_components/ButtonGroup";
import classes from "@/app/_styles/sass/Detail.module.scss";

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryPosts, setCategoryPosts] = useState<Map<number, Post[]>>(
    new Map()
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const { categories } = await res.json();
      console.log("取得したカテゴリ一覧:", categories);
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
    <div className={classes.mainWrapper}>
      <ButtonGroup />
      <div className="p-8">
        <PageTitle ttl="カテゴリー一覧" />
        {categories.map((category) => (
          <ViewerCategoryPost
            key={category.id}
            category={category}
            categoryPosts={categoryPosts}
          />
        ))}{" "}
      </div>
    </div>
  );
};

export default CategoryPage;
