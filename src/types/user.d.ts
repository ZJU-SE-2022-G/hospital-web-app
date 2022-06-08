declare interface User {
  uid: number;
  id: string;
  name: string;
  phone: string;
  isAdmin: number;
}

declare interface LoginUserRequest {
  phone: string;
  password: string;
}

declare interface RegisterUserRequest {
  id: string;
  name: string;
  phone: string;
  password: string;
}
