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
import ro.boa.clinic.dto.TicketCreationRequestDto;
import ro.boa.clinic.dto.TicketUpdateRequestDto;
import ro.boa.clinic.model.*;
import ro.boa.clinic.service.TicketService;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
public class DoctorControllerTest {
    @Autowired
    private TicketService ticketService;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private RequestTester requestTester;

    @Autowired
    private EntityTestUtils entityTestUtils;

    private Doctor doctor;

    @BeforeAll
    public void setUp() throws Exception {
        requestTester.createTestAccount(Role.DOCTOR);
        doctor = requestTester.createTestDoctor();
        requestTester.authenticateAccount();
    }

    @Test
    void updateRequest_validData_assignsFreestDoctor() throws Exception {
        var doctor1 = entityTestUtils.createDoctor("Doctor2", "OtherSpecialization");

        var patient = entityTestUtils.createPatient("Dan", "Doe");

        TicketCreationRequestDto asd = new TicketCreationRequestDto("Title", "Description", "Specialization");
        var storedTicket = ticketService.createTicket(asd, patient, doctor);

        var updateTicketDto = new TicketUpdateRequestDto(Optional.empty(), Optional.empty(), Optional.empty(), Optional.of("OtherSpecialization"));
        mockMvc.perform(requestTester.authenticatedPatch("/tickets/" + storedTicket.getId(), updateTicketDto))
                .andExpect(status().isOk());
        var createdTicket = ticketService.findWithDoctorByTitle(storedTicket.getTitle()).orElseThrow();
        var assignedDoctor = createdTicket.getDoctor();

        assertNotNull(assignedDoctor);
        assertEquals(doctor1.getId(), assignedDoctor.getId());
    }

}
