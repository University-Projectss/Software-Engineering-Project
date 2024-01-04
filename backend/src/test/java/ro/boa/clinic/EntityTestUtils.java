package ro.boa.clinic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ro.boa.clinic.model.Account;
import ro.boa.clinic.model.Doctor;
import ro.boa.clinic.model.Role;
import ro.boa.clinic.service.AccountService;
import ro.boa.clinic.service.DoctorService;

@Component
public class EntityTestUtils {
    @Autowired
    private AccountService accountService;

    @Autowired
    private DoctorService doctorService;

    public Account createAccount(String email, Role role) {
        return accountService.createAccount(email, "TestPassword", role);
    }

    public Doctor createDoctor(String firstName, String specialization) {
        var account = createAccount(firstName + "@example.com", Role.DOCTOR);
        return doctorService.createDoctorProfile(firstName, "TestDoctor", specialization, account.getEmail());
    }
}
