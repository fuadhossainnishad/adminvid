export interface IVideo {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  video_file: string;
  is_premium: boolean;
  upload_date: string;
}

export interface IVideoPagination {
  total_count: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
  next_page: number | null;
  prev_page: number | null;
}

export interface IVideoResponse {
  code: number;
  success: boolean;
  message: string;
  timestamp: number;
  pagination: IVideoPagination;
  results: IVideo[];
}
