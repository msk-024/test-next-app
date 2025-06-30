// 新規投稿・編集用フォーム（再利用）
"use client";

import React from "react";
import { Category } from "@/app/_types/AdminPost";
import { FormButton } from "./FormButton";
interface PostFormProps {
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
  thumbnailUrl: string;
  setThumbnailUrl: (value: string) => void;
  categories: Category[];
  selectedCategoryIds: number[];
  toggleCategory: (id: number) => void;
  onSubmit: () => void;
  loading: boolean;
  errorMessage?: string;
  submitLabel?: string; // 例: "保存", "作成する"
}

export const PostForm: React.FC<PostFormProps> = ({
  title,
  setTitle,
  content,
  setContent,
  thumbnailUrl,
  setThumbnailUrl,
  categories,
  selectedCategoryIds,
  toggleCategory,
  onSubmit,
  loading,
  errorMessage,
  submitLabel = "保存",
}) => {
  return (
    <div>
      <div>
        <label className="block mb-2 font-semibold">タイトル</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-4 text-black"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">本文</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="w-full p-2 border rounded mb-4 text-black"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">サムネイルURL</label>
        <input
          type="text"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          className="w-full p-2 border rounded mb-4 text-black"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">カテゴリ</label>
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => toggleCategory(cat.id)}
              className={`px-3 py-1 rounded border ${
                selectedCategoryIds.includes(cat.id)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "hover:bg-blue-400"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {errorMessage && (
        <p className="text-red-600 mb-4 font-semibold">{errorMessage}</p>
      )}

      <FormButton label={submitLabel} onClick={onSubmit} disabled={loading} />
    </div>
  );
};
