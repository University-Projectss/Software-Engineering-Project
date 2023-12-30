package ro.boa.clinic;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import ro.boa.clinic.model.Role;
import ro.boa.clinic.service.AccountService;
import ro.boa.clinic.service.DoctorService;

import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
public class SpecializationControllerTest {
    @Autowired
    private DoctorService doctorService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private RequestTester requestTester;

    @BeforeAll
    public void setUp() throws Exception {
        requestTester.createTestAccount(Role.PATIENT);
        requestTester.authenticateAccount();
    }

    @Test
    void specializationsRequest_authenticated_returnsSpecializationsList() throws Exception {
        var account1 = accountService.createDoctorAccount("userd1@example.com", "Passwordd1");
        var doctor1 = doctorService.createDoctorProfile("Alex", "Doe", "Gastroenterologie", account1.getEmail());

        var account2 = accountService.createDoctorAccount("userd2@example.com", "Passwordd2");
        var doctor2 = doctorService.createDoctorProfile("Sam", "Doe", "Neurologie", account2.getEmail());

        var account3 = accountService.createDoctorAccount("userd3@example.com", "Passwordd3");
        var doctor3 = doctorService.createDoctorProfile("Rose", "Doe", "Stomatologie", account3.getEmail());

        mockMvc.perform(requestTester.authenticatedGet("/specializations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", containsInAnyOrder(doctor1.getSpecialization(), doctor2.getSpecialization(),doctor3.getSpecialization())));
    }
}