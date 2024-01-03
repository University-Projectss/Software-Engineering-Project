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
import ro.boa.clinic.model.Account;
import ro.boa.clinic.model.Role;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
public class AccountControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private RequestTester requestTester;

    private Account account;

    @BeforeAll
    public void setUp() throws Exception {
        account = requestTester.createTestAccount(Role.PATIENT);
        requestTester.authenticateAccount();
    }

    @Test
    void detailsRequest_authenticated_returnsDetails() throws Exception {
        mockMvc.perform(requestTester.authenticatedGet("/accounts/0")).andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(account.getEmail()))
                .andExpect(jsonPath("$.role").value(account.getRole().name()));
    }
}
