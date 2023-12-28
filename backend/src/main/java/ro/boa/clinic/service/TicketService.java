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
import java.util.Optional;
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

    public TicketResponseDto updateTicketAuthenticatedUser(Long id, TicketUpdateRequestDto ticketUpdateRequest) {
        var role = accountService.getAuthenticatedUserAccount().getRole();

        var ticket = ticketRepository.findById(id);
        Ticket existingTicket = ticket.orElseThrow(TicketNotFound::new);

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
        ticketUpdateRequest.status().ifPresent(status -> existingTicket.setStatus(Status.valueOf(status)));

        switch (role) {
            case PATIENT -> {
                ticketUpdateRequest.description().ifPresent(existingTicket::setDescription);
                ticketUpdateRequest.title().ifPresent(existingTicket::setTitle);

                return convertTicketToPatientTicketDto(ticketRepository.save(existingTicket));
            }
            case DOCTOR -> {
                if (!validateSpecialization(ticketUpdateRequest.specialization().orElse(""))) {
                    throw new DoctorSpecializationNotFound();
                }
                ticketUpdateRequest.specialization().ifPresent(existingTicket::setSpecialization);
                return convertTicketToDoctorTicketDto(ticketRepository.save(existingTicket));
            }
            default -> throw new UnauthorizedAccessException();
        }
    }

    public List<TicketResponseDto> getAuthenticatedUserTickets(Optional<Status> status) {
        var role = accountService.getAuthenticatedUserAccount().getRole();
        switch (role) {
            case PATIENT -> {
                var patient = patientService.getAuthenticatedPatientProfile();

                List<Ticket> tickets;
                if (status.isEmpty()) {
                    tickets = ticketRepository.getTicketsByPatientAndStatusIs(patient, Status.OPENED);
                    tickets.addAll(ticketRepository.getTicketsByPatientAndStatusIs(patient, Status.CLOSED));
                } else {
                    tickets = ticketRepository.getTicketsByPatientAndStatusIs(patient, status.get());
                }
                return tickets.stream()
                        .map(this::convertTicketToPatientTicketDto)
                        .collect(Collectors.toList());
            }
            case DOCTOR -> {
                var doctor = doctorService.getAuthenticatedDoctorProfile();

                List<Ticket> tickets;
                if (status.isEmpty()) {
                    tickets = ticketRepository.getTicketsByDoctorAndStatusIs(doctor, Status.OPENED);
                    tickets.addAll(ticketRepository.getTicketsByDoctorAndStatusIs(doctor, Status.CLOSED));
                } else {
                    tickets = ticketRepository.getTicketsByDoctorAndStatusIs(doctor, status.get());
                }
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