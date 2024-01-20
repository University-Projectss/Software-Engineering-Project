export interface TicketInterface {
  id: number;
  doctorName: string;
  patientName: string;
  title: string;
  description: string;
  response: string;
  status: "OPENED" | "CLOSED";
  specialization: string;
}
