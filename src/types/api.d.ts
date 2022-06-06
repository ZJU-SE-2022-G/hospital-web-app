declare interface ApiResponse<T> {
  state: number;
  message: string;
  data: T;
}
