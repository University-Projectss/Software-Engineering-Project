package ro.boa.clinic.dto;

import jakarta.validation.constraints.Pattern;

import java.util.Optional;

public record TicketUpdateRequestDto(
        Optional<String> title,
        Optional<String> description,
        Optional<@Pattern(regexp = "^(OPENED|CLOSED)$") String> status,
        Optional<String> specialization) {
}