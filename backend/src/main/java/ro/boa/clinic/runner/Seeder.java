package ro.boa.clinic.runner;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import ro.boa.clinic.dto.TicketCreationRequestDto;
import ro.boa.clinic.model.Sex;
import ro.boa.clinic.service.AccountService;
import ro.boa.clinic.service.DoctorService;
import ro.boa.clinic.service.PatientService;
import ro.boa.clinic.service.TicketService;

import java.time.LocalDate;

@RequiredArgsConstructor
@Component
public class Seeder implements ApplicationRunner {
    private final AccountService accountService;
    private final PatientService patientService;
    private final DoctorService doctorService;
    private final TicketService ticketService;

    @Override
    public void run(ApplicationArguments args) {
        accountService.createPatientAccount("user1@example.com", "Password1");

        var account1 = accountService.createPatientAccount("user2@example.com", "Password2");
        var patient1 = patientService.createPatientProfile("John", "Doe", Sex.MALE, LocalDate.of(2004, 1, 8), account1.getEmail());

        var account2 = accountService.createPatientAccount("user3@example.com", "Password3");
        var patient2 = patientService.createPatientProfile("Clara", "Doe", Sex.FEMALE, LocalDate.of(2004, 1, 8), account2.getEmail());

        var account3 = accountService.createDoctorAccount("user4@example.com", "Password4");
        var doctor1 = doctorService.createDoctorProfile("Lara", "Doe", "Gastroenterologie", account3.getEmail());

        var account4 = accountService.createDoctorAccount("user5@example.com", "Password5");
        var doctor2 = doctorService.createDoctorProfile("Jonah", "Doe", "Neurologie", account4.getEmail());

        var ticketToCreate1 = new TicketCreationRequestDto("Durere de burta",
                "Ma doare burta cand mananc cartofi prajiti", "Gastroenterologie");
        ticketService.createTicket(ticketToCreate1, patient1);

        var ticketToCreate2 = new TicketCreationRequestDto("Durere de cap",
                "Ma doare capul cand ma enervez", "Neurologie");
        ticketService.createTicket(ticketToCreate2, patient2);

        var ticketToCreate3 = new TicketCreationRequestDto("Durere de masea",
                "Ma doare maseaua cand beau apa rece", "Stomatologie");
        ticketService.createTicket(ticketToCreate3, patient2);
    }
}
