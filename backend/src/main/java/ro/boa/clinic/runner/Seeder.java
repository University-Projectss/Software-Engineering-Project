package ro.boa.clinic.runner;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ro.boa.clinic.model.Account;
import ro.boa.clinic.repository.AccountRepository;

@RequiredArgsConstructor
@Component
public class Seeder implements ApplicationRunner {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        Account account = new Account("user1@example.com", passwordEncoder.encode("Password1"));
        accountRepository.save(account);
    }
}
