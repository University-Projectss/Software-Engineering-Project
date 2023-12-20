// TicketsTab.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TicketsTab } from '../TicketsTab';
import { Tabs } from '@chakra-ui/react';

const mockProps = {
    text: 'Sample Tab',
    numTickets: 5,
};

describe('TicketsTab Component', () => {
    it('renders tab content correctly', () => {
        render(<Tabs><TicketsTab {...mockProps} /></Tabs>);

        // Check if the tab text is rendered
        expect(screen.getByText(/Sample Tab/i)).toBeInTheDocument();

        // Check if the number of tickets is rendered
        expect(screen.getByText(/5/i)).toBeInTheDocument();

        // Check if the box has the correct styles and properties
        const boxElement = screen.getByTestId('tickets-tab-box');
        expect(boxElement).toHaveStyle('background-color: white;');
        expect(boxElement).toHaveStyle('color: black;');
        expect(boxElement).toHaveStyle('border: 1px solid black;');
        expect(boxElement).toHaveStyle('border-radius: full;');
        expect(boxElement).toHaveStyle('cursor: pointer;');

        // Check if the text and badge elements are present
        const textElement = screen.getByText(/Sample Tab/i);
        const badgeElement = screen.getByText(/5/i);
        expect(textElement).toBeInTheDocument();
        expect(badgeElement).toBeInTheDocument();

        // Check if the text has the correct styles and properties
        expect(textElement).toHaveStyle('margin-right: 2px;');

        // Check if the badge has the correct styles and properties
        expect(badgeElement).toHaveStyle('font-weight: bold;');
        expect(badgeElement).toHaveStyle('background-color: #467BE1;');
        expect(badgeElement).toHaveStyle('color: white;');
        expect(badgeElement).toHaveStyle('border-radius: full;');
    });
});
