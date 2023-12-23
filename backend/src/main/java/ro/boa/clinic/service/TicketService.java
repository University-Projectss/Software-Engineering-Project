package ro.boa.clinic.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ro.boa.clinic.dto.*;
import ro.boa.clinic.exception.TicketNotFoundException;
import ro.boa.clinic.exception.UnauthorizedAccessException;
import ro.boa.clinic.model.Patient;
import ro.boa.clinic.model.Status;
import ro.boa.clinic.model.Ticket;
import ro.boa.clinic.repository.TicketRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class TicketService {
    private final TicketRepository ticketRepository;
    private final PatientService patientService;
    private final DoctorService doctorService;
    private final AccountService accountService;

    public Ticket createTicket(TicketCreationRequestDto ticketCreationRequest, Patient patient) {
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

    public List<TicketResponseDto> getAllTickets(String userEmail) {
        var role = accountService.getAccountRoleByEmail(userEmail);
        switch (role) {
            case PATIENT -> {
                var patient = patientService.getAuthenticatedPatientProfile();
                var tickets = ticketRepository.getTicketsByPatient(patient);
                return tickets.stream()
                        .map(this::convertTicketToPatientTicketDto)
                        .collect(Collectors.toList());
            }
            case DOCTOR -> {
                var doctor = doctorService.getAuthenticatedDoctorProfile();
                var tickets = ticketRepository.getTicketsByDoctor(doctor);
                return tickets.stream()
                        .map(this::convertTicketToDoctorTicketDto)
                        .collect(Collectors.toList());
            }
        }
        return null;
    }

    private PatientTicketResponseDto convertTicketToPatientTicketDto(Ticket ticket) {
        return new PatientTicketResponseDto(
                ticket.getId(),
                ticket.getDoctor(),
                ticket.getTitle(),
                ticket.getDescription(),
                ticket.getSpecialization(),
                ticket.getStatus());
    }

    private DoctorTicketResponseDto convertTicketToDoctorTicketDto(Ticket ticket) {
        return new DoctorTicketResponseDto(
                ticket.getId(),
                ticket.getPatient(),
                ticket.getTitle(),
                ticket.getDescription(),
                ticket.getSpecialization(),
                ticket.getStatus());
    }
}
