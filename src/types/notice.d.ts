declare interface Notice {
  id: number;
  authorId: number;
  title: string;
  content: string;
  releaseTime: string;
  updateTime: string;
  version: number;
  deleted: number;
}

declare interface ListNoticesRequest {
  p: number;
  pageSize: number;
}

declare interface GetNoticeRequest {
  id: string;
}

declare interface CreateNoticeRequest {
  title: string;
  content: string;
}
