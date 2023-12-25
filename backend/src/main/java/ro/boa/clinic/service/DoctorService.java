package ro.boa.clinic.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ro.boa.clinic.exception.AccountAlreadyHasProfile;
import ro.boa.clinic.model.Doctor;
import ro.boa.clinic.repository.DoctorRepository;

@RequiredArgsConstructor
@Service
@Slf4j
public class DoctorService {
    private final DoctorRepository doctorRepository;
    private final AccountService accountService;

    public boolean checkSpecializationExists(String specialization) {
        return doctorRepository.existsDoctorBySpecialization(specialization);
    }

    @Transactional
    public Doctor createDoctorProfile(String firstName, String lastName, String specialization, String accountEmail) {
        log.info("Creating a new doctor profile");
        var doctor = new Doctor(firstName, lastName, specialization);
        var doctorCreated = doctorRepository.save(doctor);
        boolean wasLinked = accountService.linkProfileToAccount(doctorCreated, accountEmail);
        if (!wasLinked) {
            throw new AccountAlreadyHasProfile();
        }
        return doctorCreated;
    }
}