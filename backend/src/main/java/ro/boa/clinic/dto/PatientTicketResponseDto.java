package ro.boa.clinic.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import ro.boa.clinic.model.Doctor;
import ro.boa.clinic.model.Status;

@Setter
@Getter
@AllArgsConstructor
public class PatientTicketResponseDto implements TicketResponseDto {
    private Long id;
    private String doctorName;
    private String title;
    private String description;
    private String specialization;
    private Status status;
}
