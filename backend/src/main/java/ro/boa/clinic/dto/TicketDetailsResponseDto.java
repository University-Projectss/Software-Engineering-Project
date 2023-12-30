package ro.boa.clinic.dto;

import ro.boa.clinic.model.Status;
import ro.boa.clinic.model.Doctor;

public record TicketDetailsResponseDto(Status status, String description, String specialization, Doctor doctor) {
}
