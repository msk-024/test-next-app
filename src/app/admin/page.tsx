// 管理者ページ リダイレクト
// のちに管理者ダッシュボード

import { redirect } from "next/navigation";

export default function AdminPage() {
  redirect("/admin/posts");
}
