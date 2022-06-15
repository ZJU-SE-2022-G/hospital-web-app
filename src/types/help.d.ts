declare interface Help {
  id: number;
  authorId: number;
  title: string;
  content: string;
  releaseTime: number;
  updateTime: number;
  version: number;
  deleted: number;
}

declare interface ListHelpsRequest {
  p: number;
  pageSize: number;
  query: string;
}

declare interface CreateHelpRequest {
  title: string;
  content: string;
}

declare interface DeleteHelpRequest {
  id: number;
}
