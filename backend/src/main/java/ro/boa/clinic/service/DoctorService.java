package ro.boa.clinic.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ro.boa.clinic.exception.DoctorProfileNotFoundException;
import ro.boa.clinic.model.Doctor;
import ro.boa.clinic.repository.DoctorRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class DoctorService {
    private final AccountService accountService;
    private final DoctorRepository doctorRepository;

    public Doctor getAuthenticatedDoctorProfile() {
        log.info("Getting authenticated patient profile");
        var userEmail = accountService.getAuthenticatedUserEmail();
        var doctorProfile = doctorRepository.findDoctorProfileByEmail(userEmail);
        if (doctorProfile == null) {
            throw new DoctorProfileNotFoundException();
        } else {
            return doctorProfile;
        }
    }
}
