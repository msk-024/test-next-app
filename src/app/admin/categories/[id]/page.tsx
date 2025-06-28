"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { PageTitle } from "@/app/_components/PageTitle";

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [name, setName] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetch(`/api/categories/${id}`);
      const data = await res.json();
      setName(data.category.name);
    };
    fetchCategory();
  }, [id]);

  const handleUpdate = async () => {
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
