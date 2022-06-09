declare interface ReserveNucleicRequest {
  usrId: string;
  usrName: string;
  testType: string;
  testDate: string;
}

declare interface ReserveVaccineRequest {
  usrId: string;
  usrName: string;
  age: number;
  sex: string;
  vacNum: string;
  vacDate: string;
}
