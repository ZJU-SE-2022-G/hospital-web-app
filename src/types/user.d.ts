declare interface User {
  uid: number;
  id: string;
  name: string;
  phone: string;
  isAdmin: number;
}

declare interface Reserve {
  age: number;
  did: string;
  name: string;
  orderData: string;
  pwd: string;
  rid: number;
  serialnumber: number;
  sex: string;
  state: string;
  uid: number;
  visitData: string;
  wid: number;
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
