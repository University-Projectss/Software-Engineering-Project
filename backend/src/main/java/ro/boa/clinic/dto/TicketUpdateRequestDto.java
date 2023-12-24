package ro.boa.clinic.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import ro.boa.clinic.model.Status;

public record TicketUpdateRequestDto(
        @NotNull long id,
        @Nullable String title,
        @Nullable String description,
        @Nullable Status status,
        @Nullable String specialization) {
}