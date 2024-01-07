package ro.boa.clinic.dto;

import ro.boa.clinic.model.Doctor;
import ro.boa.clinic.model.Status;

public record TicketDetailsResponseDto(Status status,
                                       String description,
                                       String specialization,
                                       Doctor doctor,
                                       String response) {
}
