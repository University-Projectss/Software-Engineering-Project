package ro.boa.clinic;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import ro.boa.clinic.model.Account;
import ro.boa.clinic.model.Doctor;
import ro.boa.clinic.model.Role;
import ro.boa.clinic.repository.DoctorRepository;

import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class SpecializationControllerTest {
    @Autowired
    private DoctorRepository doctorRepository;

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
        var doctor1 = new Doctor("Alex", "Doe", "Neurology");
        var doctor2 = new Doctor("Sam", "Doe", "Ophthalmology");
        doctorRepository.save(doctor1);
        doctorRepository.save(doctor2);

        mockMvc.perform(requestTester.authenticatedGet("/specializations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", containsInAnyOrder(doctor1.getSpecialization(), doctor2.getSpecialization())));
    }
}