package ro.boa.clinic.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import ro.boa.clinic.model.Patient;
import ro.boa.clinic.model.Status;

@Setter
@Getter
@AllArgsConstructor
public class DoctorTicketResponseDto implements TicketResponseDto {
    private Long id;
    private Patient patient;
    private String title;
    private String description;
    private String specialization;
    private Status status;
}
