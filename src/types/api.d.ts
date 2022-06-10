declare interface ApiResponse<T> {
  state: number;
  message: string;
  data: T;
}

declare interface Page<T> {
  total: number;
  size: number;
  current: number;
  records: T[];
}
