declare interface Notice {
  id: number;
  title: string;
  authorId: number;
  releaseTime: string;
  updateTime: string;
  version: number;
  deleted: number;
  content: string;
}

declare interface GetNoticesRequest {
  p: number;
  pageSize: number;
}
