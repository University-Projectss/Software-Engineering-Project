package ro.boa.clinic.dto;

import ro.boa.clinic.model.Status;

public record TicketUpdateRequestDto(long id, String description, Status status, String specialization) {
}