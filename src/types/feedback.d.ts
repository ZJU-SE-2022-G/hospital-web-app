declare interface Feedback {
  id: number;
  problemType: string;
  title: string;
  problem: string;
  askerId: number;
  isAnswered: number;
  askTime: number;
  answer: string;
  respondentId: number;
  resTime: number;
  deleted: number;
  version: number;
}

declare interface ListFeedbacksRequest {
  p: number;
  pageSize: number;
}

declare interface GetFeedbackRequest {
  id: string;
}

declare interface CreateFeedbackRequest {
  problemType: string;
  title: string;
  problem: string;
}

declare interface UpdateFeedbackRequest {
  id: string;
  answer: string;
}