export interface INotification {
  id: number;
  time_ago: string;
  notification_type: string;
  message: string;
  is_read: boolean;
  created_at: string;
  recipient: number;
  sender: string | null;
}

export interface INotificationPagination {
  total_count: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
  next_page: number | null;
  prev_page: number | null;
}

export interface INotificationResponse {
  code: number;
  success: boolean;
  message: string;
  timestamp: number;
  pagination: INotificationPagination;
  results: INotification[];
}
