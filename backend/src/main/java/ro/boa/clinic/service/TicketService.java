package ro.boa.clinic.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ro.boa.clinic.dto.TicketCreationRequestDto;
import ro.boa.clinic.dto.TicketDetailsResponseDto;
import ro.boa.clinic.exception.DoctorSpecializationNotFound;
import ro.boa.clinic.exception.TicketNotFoundException;
import ro.boa.clinic.exception.UnauthorizedAccessException;
import ro.boa.clinic.model.Patient;
import ro.boa.clinic.model.Status;
import ro.boa.clinic.model.Ticket;
import ro.boa.clinic.repository.DoctorRepository;
import ro.boa.clinic.repository.TicketRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class TicketService {
    private final TicketRepository ticketRepository;
    private final DoctorRepository doctorRepository;
    private final PatientService patientService;

    public Ticket createTicket(TicketCreationRequestDto ticketCreationRequest, Patient patient) {
        final boolean specializationExists = doctorRepository.listAllSpecializations().stream().anyMatch(s -> ticketCreationRequest.specialization().equals(s));
        if (!specializationExists) {
            throw new DoctorSpecializationNotFound();
        }

        log.info("Creating a new ticket");
        var ticket = new Ticket(patient,
                ticketCreationRequest.title(),
                ticketCreationRequest.description(),
                ticketCreationRequest.specialization(),
                Status.OPENED);
        return ticketRepository.save(ticket);
    }

    public TicketDetailsResponseDto getTicketDetails(Long id) {
        var ticket = ticketRepository.findById(id).orElseThrow(TicketNotFoundException::new);
        if (isTicketOwnedByLoggedInPatient(ticket)) {
            log.info("Returning ticket details");
            return new TicketDetailsResponseDto(ticket.getStatus(),
                    ticket.getDescription(),
                    ticket.getSpecialization(),
                    ticket.getDoctor());
        } else {
            throw new UnauthorizedAccessException();
        }
    }

    public boolean isTicketOwnedByLoggedInPatient(Ticket ticket) {
        log.info("Checking that the id of the logged-in patient is the same as " +
                "the id of the patient associated with the ticket");
        var patientProfile = patientService.getAuthenticatedPatientProfile();
        return patientProfile.getId().equals(ticket.getPatient().getId());
    }
}
