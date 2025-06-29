"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { PageTitle } from "@/app/_components/PageTitle";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/categories/${id}`);
        if (!res.ok) throw new Error("取得失敗");
        const data = await res.json();
        setName(data.category.name);
      } catch (e) {
        console.error(e);
        alert("読み込み失敗");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  if (loading) return <p>読み込み中...</p>;

  const handleUpdate = async () => {
    if (!name.trim()) {
      alert("カテゴリ名を入力してください");
      return;
    }
    const res = await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      alert("更新しました");
      router.push("/admin/categories");
    } else {
      alert("更新に失敗しました");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <PageTitle ttl="カテゴリ編集" />
      <input
        className="border p-2 w-full mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white p-2 rounded"
      >
        更新する
      </button>
    </div>
  );
}
