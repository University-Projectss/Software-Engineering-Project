package ro.boa.clinic.runner;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import ro.boa.clinic.model.Sex;
import ro.boa.clinic.service.AccountService;
import ro.boa.clinic.service.PatientService;

import java.time.LocalDate;

@RequiredArgsConstructor
@Component
public class Seeder implements ApplicationRunner {
    private final AccountService accountService;
    private final PatientService patientService;

    @Override
    public void run(ApplicationArguments args) {
        accountService.createPatientAccount("user1@example.com", "Password1");

        accountService.createPatientAccount("ioanapopescu@gmail.com", "password");
        patientService.createPatientWithAccount("Ioana", "Popescu", Sex.FEMALE, LocalDate.of(2023, 1, 8), "ioanapopescu@gmail.com");
    }
}
