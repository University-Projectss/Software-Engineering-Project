export interface Ticket {
    id: number;
    doctorName: string;
    date: string;
    userRequest: string;
    status: "opened" | "closed";
    specialization: string;
}
