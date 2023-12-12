export interface TicketInterface {
    doctorName: string;
    date: string;
    userRequest: string;
    status: "opened" | "closed";
    specialization: string;
}
