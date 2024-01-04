export interface TicketInterface {
  id: number;
  doctor?: string;
  title: string;
  description: string;
  status: "OPENED" | "CLOSED";
  specialization: string;
}
