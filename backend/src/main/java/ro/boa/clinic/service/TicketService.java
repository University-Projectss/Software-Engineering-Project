package ro.boa.clinic.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.boa.clinic.dto.TicketCreationRequestDto;
import ro.boa.clinic.model.Ticket;
import ro.boa.clinic.repository.TicketRepository;

@Service
@Slf4j
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private PatientService patientService;

    public void createTicket(TicketCreationRequestDto ticketCreationRequest){
        log.info("Creating a new ticket..");
        var patient = patientService.getAuthenticatedPatientProfile();
        var ticket = new Ticket();
        ticket.setDescription(ticketCreationRequest.getDescription());
        ticket.setTitle(ticketCreationRequest.getTitle());
        ticket.setSpecialization(ticketCreationRequest.getSpecialization());
        ticket.setPatient(patient);

        ticketRepository.save(ticket);
    }
}
