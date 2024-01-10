export interface TicketInterface {
  id: number;
  doctorName: string;
  title: string;
  description: string;
  response: string;
  status: "OPENED" | "CLOSED";
  specialization: string;
}
