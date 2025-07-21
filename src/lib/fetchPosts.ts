// 管理画面用に投稿データを取得
export interface FetchedPost {
  id: number;
  title: string;
  createdAt: string;
  thumbnailUrl: string;
  postCategories: {
    category: {
      id: number;
      name: string;
    };
  }[];
}

export const fetchPosts = async (): Promise<FetchedPost[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/posts`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("投稿データの取得に失敗しました");
  }

  const data = await res.json();
  return data.posts;
};
