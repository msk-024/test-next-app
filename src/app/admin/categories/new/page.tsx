"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageTitle } from "@/app/_components/PageTitle";
import { CategoryForm } from "../_components/CategoryForm";

export default function NewCategoryPage() {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name.trim()) {
      setErrorMessage("カテゴリ名を入力してください。");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("カテゴリーの作成に失敗しました");
      alert("カテゴリーを作成しました！");
      router.push("/admin/categories");
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <PageTitle ttl="新規カテゴリー作成" />
      <div className="mb-4">
        <CategoryForm
        name={name}
        setName={setName}
        onSubmit={handleSubmit}
        loading={loading}
        errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}
