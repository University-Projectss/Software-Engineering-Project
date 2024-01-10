// Ticket.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Ticket } from "../Ticket";
import { TicketInterface } from "../types";

const mockTicket: TicketInterface = {
  id: 1,
  doctorName: "John Doe",
  title: "title",
  description: "Sample request",
  response: "Sample response",
  status: "OPENED",
  specialization: "Cardiology",
};

describe("Ticket Component", () => {
  it("renders ticket content correctly", () => {
    render(<Ticket ticket={mockTicket} handleOpenTicket={() => {}} />);

    // Check if the doctor's name is rendered
    expect(screen.getByText(/Dr\. John Doe/i)).toBeInTheDocument();

    // Check if the date is rendered
    // expect(screen.getByText(/Date:/i)).toBeInTheDocument();
    // expect(screen.getByText(/2023-01-01/i)).toBeInTheDocument();

    // Check if the specialization badge is rendered
    expect(screen.getByText(/Cardiology/i)).toBeInTheDocument();

    // Check if the user request is rendered
    expect(screen.getByText(/Your Request/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample request/i)).toBeInTheDocument();

    // Check if the "See more details" button is rendered
    expect(screen.getByText(/See more details/i)).toBeInTheDocument();
  });

  it("handles 3-dots-menu click", async () => {
    render(<Ticket ticket={mockTicket} handleOpenTicket={() => {}} />);

    // Ensure menu is initially closed
    const editMenuItem = screen.queryByText(/Edit/i);
    const deleteMenuItem = screen.queryByText(/Delete/i);

    expect(editMenuItem).not.toBeVisible();
    expect(deleteMenuItem).not.toBeVisible();

    // Click the 3-dots-menu button
    fireEvent.click(screen.getByLabelText("Options"));

    // Wait for the "Edit" menu item to become visible
    await waitFor(() => {
      const updatedEditMenuItem = screen.queryByText(/Edit/i);
      expect(updatedEditMenuItem).toBeVisible();
    });

    // Wait for the "Delete" menu item to become visible
    await waitFor(() => {
      const updatedDeleteMenuItem = screen.queryByText(/Delete/i);
      expect(updatedDeleteMenuItem).toBeVisible();
    });
  });
});
