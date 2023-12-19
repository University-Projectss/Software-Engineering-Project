package ro.boa.clinic.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ro.boa.clinic.model.Account;
import ro.boa.clinic.model.Profile;
import ro.boa.clinic.model.Role;
import ro.boa.clinic.repository.AccountRepository;

@RequiredArgsConstructor
@Service
@Slf4j
public class AccountService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public Account createDoctorAccount(String email, String password) throws DataIntegrityViolationException {
        return createAccount(email, password, Role.DOCTOR);
    }

    public Account createPatientAccount(String email, String password) throws DataIntegrityViolationException {
        return createAccount(email, password, Role.PATIENT);
    }

    public Account getAccountByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }

    /**
     * @param email    the email address of the account
     * @param password the plain text password
     * @return the created account entity
     * @throws DataIntegrityViolationException the email address is likely already used
     */
    public Account createAccount(String email, String password, Role role) throws DataIntegrityViolationException {
        log.info("Creating a new account..");
        final String hashedPassword = passwordEncoder.encode(password);
        Account newAccount = new Account(email, hashedPassword, role);

        return accountRepository.save(newAccount);
    }

    public Account getAuthenticatedUserAccount() {
        log.info("Getting authenticated user account..");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            var email = authentication.getName();
            return accountRepository.findByEmail(email);
        }
        return null;
    }

    public void linkProfileToAccount(Profile profile, String email) {
        log.info("Linking profile to account..");
        var account = getAccountByEmail(email);
        account.setProfile(profile);
        saveAccount(account);
    }
}
