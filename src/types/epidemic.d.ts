declare interface CreateNucleicReservationRequest {
  usrId: string;
  usrName: string;
  testType: string;
  testDate: string;
}

declare interface CreateVaccineReservationRequest {
  usrId: string;
  usrName: string;
  age: number;
  sex: string;
  vacNum: number;
  vacDate: string;
}
