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
    void updateRequest_newSpecialization_assignsNewFreestDoctor() throws Exception {
        var newDoctor = entityTestUtils.createDoctor("NewDoctor", "NewSpecialization");
        var patient = entityTestUtils.createPatient("Dan", "Doe");
        TicketCreationRequestDto creationDto = new TicketCreationRequestDto("Title",
                                                                            "Description",
                                                                            this.doctor.getSpecialization());
        var ticket = ticketService.createTicket(creationDto, patient, this.doctor);
        var updateTicketDto = new TicketUpdateRequestDto(Optional.empty(),
                                                         Optional.empty(),
                                                         Optional.empty(),
                                                         Optional.of("NewSpecialization"));

        mockMvc.perform(requestTester.authenticatedPatch("/tickets/" + ticket.getId(), updateTicketDto))
               .andExpect(status().isOk());

        var assignedDoctor = ticket.getDoctor();
        assertNotNull(assignedDoctor);
        assertEquals(newDoctor.getId(), assignedDoctor.getId());
    }

}
