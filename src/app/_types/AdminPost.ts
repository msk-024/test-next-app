export interface Category {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  postCategories: { category: Category }[];
}
