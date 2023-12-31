import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TicketsTabContent } from "../TicketsTabContent";
import { TabPanels, Tabs } from "@chakra-ui/react";
import { TicketInterface } from "../types";

const mockTickets: TicketInterface[] = [
  {
    id: 1,
    title: "title",
    doctor: "John Doe",
    description: "Sample request 1",
    status: "OPENED",
    specialization: "Cardiology",
  },
  {
    id: 2,
    title: "title",
    doctor: "Jane Smith",
    description: "Sample request 2",
    status: "CLOSED",
    specialization: "Dermatology",
  },
];

const mockProps = {
  tickets: mockTickets,
  text: "Sample Tab",
};

describe("TicketsTabContent Component", () => {
  it("renders tab content correctly with tickets", () => {
    render(
      <Tabs>
        <TabPanels>
          <TicketsTabContent {...mockProps} />
        </TabPanels>
      </Tabs>
    );

    // Check if the tab text is rendered
    expect(screen.getByText(/Sample Tab/i)).toBeInTheDocument();

    // Check if the ticket components are rendered
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
    expect(screen.queryByText(/No sample tab tickets/i)).toBeNull();
  });

  it("renders tab content correctly with no tickets", () => {
    const propsWithNoTickets = { ...mockProps, tickets: [] };
    render(
      <Tabs>
        <TabPanels>
          <TicketsTabContent {...propsWithNoTickets} />
        </TabPanels>
      </Tabs>
    );

    // Check if the tab text is rendered
    const sampleTabElements = screen.queryAllByText(/Sample Tab/i);
    expect(sampleTabElements.length).toBe(2); // Expect two elements

    // Check if the "No sample tab tickets" message is rendered
    expect(screen.getByText(/No sample tab tickets/i)).toBeInTheDocument();
  });
});
