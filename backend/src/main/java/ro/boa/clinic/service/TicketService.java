package ro.boa.clinic.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ro.boa.clinic.exception.DoctorSpecializationNotFound;
import ro.boa.clinic.dto.*;
import ro.boa.clinic.exception.TicketNotFoundException;
import ro.boa.clinic.exception.UnauthorizedAccessException;
import ro.boa.clinic.dto.TicketCreationRequestDto;
import ro.boa.clinic.dto.TicketUpdateRequestDto;
import ro.boa.clinic.exception.TicketNotFound;
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
    private final DoctorService doctorService;
    private final PatientService patientService;
    private final AccountService accountService;

    private boolean validateSpecialization(String specialization) {
        return doctorService.checkSpecializationExists(specialization);
    }

    public Ticket createTicket(TicketCreationRequestDto ticketCreationRequest, Patient patient) {
        if (!validateSpecialization(ticketCreationRequest.specialization())) {
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

    public boolean isTicketOwnedByLoggedInDoctor(Ticket ticket) {
        log.info("Checking that the id of the logged-in doctor is the same as " +
                "the id of the doctor associated with the ticket");
        var doctorProfile = doctorService.getAuthenticatedDoctorProfile();
        return doctorProfile.getId().equals(ticket.getDoctor().getId());
    }

    public Ticket updateTicketAuthenticatedUser(TicketUpdateRequestDto ticketUpdateRequest) {
        var role = accountService.getAuthenticatedUserAccount().getRole();

        var ticket = ticketRepository.findById(ticketUpdateRequest.id());
        if (ticket.isEmpty()) {
            throw new TicketNotFound();
        }
        Ticket existingTicket = ticket.get();

        switch (role) {
            case PATIENT -> {
                if (!isTicketOwnedByLoggedInPatient(existingTicket)) {
                    throw new TicketNotFound();
                }
           }
            case DOCTOR -> {
                if (!isTicketOwnedByLoggedInDoctor(existingTicket)) {
                    throw new TicketNotFound();
                }
           }
        }

        log.info("Updating the ticket");
        if (ticketUpdateRequest.status() != null) {
            existingTicket.setStatus(ticketUpdateRequest.status());
        }

        switch (role) {
            case PATIENT -> {
                if (ticketUpdateRequest.description() != null) {
                    existingTicket.setDescription(ticketUpdateRequest.description());
                }
                if (ticketUpdateRequest.title() != null) {
                    existingTicket.setTitle(ticketUpdateRequest.title());
                }
            }
            case DOCTOR -> {
                if (ticketUpdateRequest.specialization() != null) {
                    existingTicket.setSpecialization(ticketUpdateRequest.specialization());
                }
            }
            default -> throw new UnauthorizedAccessException();
        }
        return ticketRepository.save(existingTicket);
    }

    public List<TicketResponseDto> getAuthenticatedUserTickets() {
        var role = accountService.getAuthenticatedUserAccount().getRole();
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
        throw new UnauthorizedAccessException();
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