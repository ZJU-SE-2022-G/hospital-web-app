declare interface Appointment {
  rid: number;
  uid: number;
  wid: number;
  did: string;
  serialnumber: number;
  name: string;
  sex: string;
  age: number;
  pwd: string;
  orderData: string;
  visitData: string;
  state: string;
}

declare interface CreateAppointmentRequest {
  uid: number;
  name: string;
  sex: string;
  age: number;
  pwd: string;
  departmentName: string;
  docName: string;
  orderedTime: string;
}
