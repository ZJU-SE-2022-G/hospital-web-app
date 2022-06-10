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

declare interface GetNoticesRequest {
  p: number;
  pageSize: number;
}

declare interface IssueNoticeRequest {
  authorId: number;
  title: string;
  content: string;
}
