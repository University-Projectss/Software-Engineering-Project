package ro.boa.clinic.dto;

import java.time.LocalDate;

public record PatientDetailsDto(Long id, String firstName, String lastName, String sex, LocalDate birthdate) {
}
