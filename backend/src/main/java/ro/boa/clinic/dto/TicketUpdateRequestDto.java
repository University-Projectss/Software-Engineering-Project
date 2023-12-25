package ro.boa.clinic.dto;

import jakarta.validation.constraints.NotNull;
import ro.boa.clinic.model.Status;

import java.util.Optional;

public record TicketUpdateRequestDto(
        Optional<String> title,
        Optional<String> description,
        Optional<Status> status,
        Optional<String> specialization) {
}