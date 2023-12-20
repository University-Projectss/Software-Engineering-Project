import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TicketsTabContent } from '../TicketsTabContent';
import { TabPanels, Tabs } from '@chakra-ui/react';

const mockTickets = [
    {
        doctorName: 'John Doe',
        date: '2023-01-01',
        userRequest: 'Sample request 1',
        status: 'opened' as const,
        specialization: 'Cardiology',
    },
    {
        doctorName: 'Jane Smith',
        date: '2023-02-01',
        userRequest: 'Sample request 2',
        status: 'closed' as const,
        specialization: 'Dermatology',
    },
];

const mockProps = {
    tickets: mockTickets,
    text: 'Sample Tab',
};

describe('TicketsTabContent Component', () => {
    it('renders tab content correctly with tickets', () => {
        render(<Tabs><TabPanels><TicketsTabContent {...mockProps} /></TabPanels></Tabs>);

        // Check if the tab text is rendered
        expect(screen.getByText(/Sample Tab/i)).toBeInTheDocument();

        // Check if the ticket components are rendered
        expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
        expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
        expect(screen.queryByText(/No sample tab tickets/i)).toBeNull();
    });

    it('renders tab content correctly with no tickets', () => {
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
