export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  postCategories: { category: Category }[];
  createdAt: string;
  updatedAt: string;
}
export interface PostDisplay extends Post {
  categories: string[];
}
