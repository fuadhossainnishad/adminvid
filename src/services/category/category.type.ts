export interface CategoryItem {
  id: number;
  name: string;
}

export interface ApiResponse<T> {
  code: number;
  success: boolean;
  message: string;
  timestamp: number;
  data: T;
}

export type CategoryType = "case-type" | "interview-category";
