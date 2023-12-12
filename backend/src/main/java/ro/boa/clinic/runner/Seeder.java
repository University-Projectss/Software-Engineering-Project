package ro.boa.clinic.runner;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import ro.boa.clinic.service.AccountService;

@RequiredArgsConstructor
@Component
public class Seeder implements ApplicationRunner {
    private final AccountService accountService;

    @Override
    public void run(ApplicationArguments args) {
        accountService.createPatient("user1@example.com", "Password1");
    }
}
