package ro.boa.clinic.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.boa.clinic.dto.TicketCreationRequestDto;
import ro.boa.clinic.model.Patient;
import ro.boa.clinic.model.Ticket;
import ro.boa.clinic.repository.TicketRepository;

@Service
@Slf4j
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    public Ticket createTicket(TicketCreationRequestDto ticketCreationRequest, Patient patient) {
        log.info("Creating a new ticket..");
        var ticket = new Ticket(patient,
                    ticketCreationRequest.title(),
                    ticketCreationRequest.description(),
                    ticketCreationRequest.specialization());
        return ticketRepository.save(ticket);
    }
}
