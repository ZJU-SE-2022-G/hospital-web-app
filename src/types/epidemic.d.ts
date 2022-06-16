declare interface NucleicReservation {
  usrId: string;
  usrName: string;
  testType: string;
  testDate: [number, number, number];
}

declare interface CreateNucleicReservationRequest {
  usrId: string;
  usrName: string;
  testType: string;
  testDate: string;
}

declare interface VaccineReservation {
  usrId: string;
  usrName: string;
  age: number;
  sex: string;
  vacNum: number;
  vacDate: [number, number, number];
}

declare interface CreateVaccineReservationRequest {
  usrId: string;
  usrName: string;
  age: number;
  sex: string;
  vacNum: number;
  vacDate: string;
}
