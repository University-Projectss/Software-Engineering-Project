package ro.boa.clinic.runner;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ro.boa.clinic.dto.TicketCreationRequestDto;
import ro.boa.clinic.model.Patient;
import ro.boa.clinic.model.Sex;
import ro.boa.clinic.service.AccountService;
import ro.boa.clinic.service.DoctorService;
import ro.boa.clinic.service.PatientService;
import ro.boa.clinic.service.TicketService;

import java.time.LocalDate;

@RequiredArgsConstructor
@Component
public class SeederHelper {

    private final AccountService accountService;
    private final PatientService patientService;
    private final DoctorService doctorService;
    private final TicketService ticketService;

    public Patient createPatientAccountAndProfile(String email, String password,
                                                  String firstName, String lastName, Sex sex, LocalDate dateOfBirth) {
        accountService.createPatientAccount(email, password);
        return patientService.createPatientProfile(firstName, lastName, sex, dateOfBirth, email);
    }

    public void createDoctorAccountAndProfile(String email, String password,
                                              String firstName, String lastName, String specialization) {
        accountService.createDoctorAccount(email, password);
        doctorService.createDoctorProfile(firstName, lastName, specialization, email);
    }

    public void createTicket(Patient patient, String title, String description, String specialization) {
        var ticket = new TicketCreationRequestDto(title, description, specialization);
        ticketService.createTicket(ticket, patient);
    }
}
