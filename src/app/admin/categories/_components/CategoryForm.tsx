"use client";
import React from "react";

interface CategoryFormProps {
  name: string;
  setName: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  errorMessage?: string;
  submitLabel?: string; // default: "作成"
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  name,
  setName,
  onSubmit,
  loading,
  errorMessage,
  submitLabel = "作成",
}) => {
  return (
    <div>
      <label className="block mb-2 font-semibold">カテゴリー名</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 rounded mb-4"
        placeholder="例: 技術, お知らせ"
      />

      {errorMessage && (
        <p className="text-red-600 mb-4 font-semibold">{errorMessage}</p>
      )}

      <button
        onClick={onSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {submitLabel}
      </button>
    </div>
  );
};
