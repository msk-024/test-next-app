export interface MicroCmsPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  // postCategories: {
  //   id: string;
  //   postId: string;
  //   categoryId: string;
  //   createdAt: string;
  //   updatedAt: string;
  //   category: { id: string; name: string }[];
  // };
  categories: {
    id: string;
    name: string;
  }[];
  thumbnail: { url: string; height: number; width: number };
}

export interface Post {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
  categories: string[];
  content: string;
}

// MicroCmsPost → Post に変換する関数
export const convertToPost = (data: MicroCmsPost): Post => {
  return {
    id: parseInt(data.id),
    title: data.title,
    thumbnailUrl: data.thumbnail.url,
    createdAt: data.createdAt,
    categories: data.categories?.map((c) => c.name) ?? [],
    content: data.content,
  };
};
