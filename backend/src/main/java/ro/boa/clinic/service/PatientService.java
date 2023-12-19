package ro.boa.clinic.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.boa.clinic.exception.type.PatientProfileNotFoundException;
import ro.boa.clinic.model.Account;
import ro.boa.clinic.model.Patient;
import ro.boa.clinic.model.Sex;
import ro.boa.clinic.repository.PatientRepository;

import java.time.LocalDate;

@Service
@Slf4j
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private AccountService accountService;

    public void createPatientProfile(String firstName, String lastName, Sex sex, LocalDate birthdate, Account account) {
        log.info("Creating a new patient profile..");
        var patient = new Patient(firstName, lastName, sex, birthdate);
        var patientCreated = patientRepository.save(patient);
        account.setProfile(patientCreated);
        accountService.saveAccount(account);
    }

    public Patient getAuthenticatedPatientProfile() {
        log.info("Getting authenticated patient profile..");
        var userEmail = accountService.getAuthenticatedUserEmail();
        var patientProfile = patientRepository.findPatientProfileByEmail(userEmail);
        if (patientProfile == null) {
            throw new PatientProfileNotFoundException();
        } else {
            return patientProfile;
        }
    }
}
