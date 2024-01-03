package ro.boa.clinic.dto;

import ro.boa.clinic.model.Role;

public record AccountDetailsDto(String email, Role role) {
}
