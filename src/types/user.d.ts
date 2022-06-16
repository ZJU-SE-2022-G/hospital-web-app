declare interface User {
  uid: number;
  id: string;
  name: string;
  phone: string;
  isAdmin: number;
}

declare interface CreateUserRequest {
  id: string;
  name: string;
  phone: string;
  password: string;
}

declare interface CreateSessionRequest {
  phone: string;
  password: string;
}
