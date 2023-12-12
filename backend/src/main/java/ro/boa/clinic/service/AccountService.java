package ro.boa.clinic.service;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ro.boa.clinic.model.Account;
import ro.boa.clinic.model.Role;
import ro.boa.clinic.repository.AccountRepository;

@RequiredArgsConstructor
@Service
public class AccountService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public Account createDoctor(String email, String password) throws DataIntegrityViolationException {
        return createAccount(email, password, Role.DOCTOR);
    }

    public Account createPatient(String email, String password) throws DataIntegrityViolationException {
        return createAccount(email, password, Role.PATIENT);
    }

    /**
     * @param email    the email address of the account
     * @param password the plain text password
     * @return the created account entity
     * @throws DataIntegrityViolationException the email address is likely already used
     */
    public Account createAccount(String email, String password, Role role) throws DataIntegrityViolationException {
        final String hashedPassword = passwordEncoder.encode(password);
        Account newAccount = new Account(email, hashedPassword, role);

        return accountRepository.save(newAccount);
    }
}
