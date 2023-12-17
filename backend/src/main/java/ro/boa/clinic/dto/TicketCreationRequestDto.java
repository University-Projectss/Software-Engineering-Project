package ro.boa.clinic.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TicketCreationRequestDto {
    private String title;
    private String description;
    private String specialization;
}
