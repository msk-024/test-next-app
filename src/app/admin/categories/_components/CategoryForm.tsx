"use client";
import React from "react";

interface CategoryFormProps {
  name: string;
  setName: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  errorMessage?: string;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  name,
  setName,
  onSubmit,
  loading,
  errorMessage,
}) => {
  return (
    <div>
      <label className="block mb-2 font-semibold">カテゴリー名</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 rounded mb-4 text-black"
        placeholder="例: JavaScript"
      />

      {errorMessage && (
        <p className="text-red-600 mb-4 font-semibold">{errorMessage}</p>
      )}

      <button
        onClick={onSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "作成中..." : "作成する"}
      </button>
    </div>
  );
};
