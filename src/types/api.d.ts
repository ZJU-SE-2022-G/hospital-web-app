declare interface ApiResponse<T> {
  state: number;
  message: string;
  data: T;
}

declare interface Page<T> {
  total: number;
  size: number;
  pages: number;
  current: number;
  records: T[];
}
