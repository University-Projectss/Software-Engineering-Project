package ro.boa.clinic.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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

    public void createPatientWithAccount(String firstName, String lastName, Sex sex, LocalDate birthdate, String email){
        log.info("Creating a new patient account..");
        var patientCreated = createPatient(firstName, lastName, sex, birthdate);
        linkPatientToAccount(patientCreated, email);
    }

    public Patient createPatient(String firstName, String lastName, Sex sex, LocalDate birthdate){
        log.info("Creating a new patient..");
        var patient = new Patient(firstName, lastName, sex, birthdate);
        return patientRepository.save(patient);
    }

    public void linkPatientToAccount(Patient patient, String email){
        log.info("Linking patient profile to account..");
        var account = accountService.getAccountByEmail(email);
        account.setProfile(patient);
        accountService.saveAccount(account);
    }

    public Patient getAuthenticatedPatientProfile(){
        log.info("Getting authenticated patient profile..");
        var account = accountService.getAuthenticatedUserAccount();
        return patientRepository.findByAccount(account);
    }
}
