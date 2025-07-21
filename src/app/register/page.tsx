"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      alert("ユーザー登録が完了しました！");
      router.push("/login");
    } else {
      const error = await res.json();
      alert("エラー: " + error.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">ユーザー登録</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="名前"
        className="border p-2 w-full mb-4 text-black"
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="メールアドレス"
        className="border p-2 w-full mb-4 text-black"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="パスワード"
        className="border p-2 w-full mb-4 text-black"
      />

      <button
        onClick={handleRegister}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        登録
      </button>
    </div>
  );
}
