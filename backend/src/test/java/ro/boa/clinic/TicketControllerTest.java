package ro.boa.clinic;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import ro.boa.clinic.dto.TicketCreationRequestDto;
import ro.boa.clinic.model.*;
import ro.boa.clinic.repository.TicketRepository;
import ro.boa.clinic.service.AccountService;
import ro.boa.clinic.service.DoctorService;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class TicketControllerTest {
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private RequestTester requestTester;

    private Patient patient;

    @BeforeAll
    public void setUp() throws Exception {
        requestTester.createTestAccount(Role.PATIENT);
        patient = requestTester.createTestPatient();
        requestTester.authenticateAccount();
    }

    @Test
    void creationRequest_incorrectData_returnsError() throws Exception {
        var account = accountService.createDoctorAccount("asd","asdas");
        doctorService.createDoctorProfile("AAA", "AAA", "AAA", account.getEmail());

        var ticketDto = new TicketCreationRequestDto("Title", "Description", "XXXXXX");

        mockMvc.perform(requestTester.authenticatedPost("/tickets", ticketDto))
                .andExpect(status().isNotFound());
    }

    @Test
    void creationRequest_validData_createsTicket() throws Exception {
        var ticketDto = new TicketCreationRequestDto("Title", "Description", "Specialization");

        mockMvc.perform(requestTester.authenticatedPost("/tickets", ticketDto))
                .andExpect(status().isCreated());

        var createdTicket = ticketRepository.findByTitle("Title");
        assertEquals(ticketDto.title(), createdTicket.getTitle());
        assertEquals(ticketDto.description(), createdTicket.getDescription());
        assertEquals(ticketDto.specialization(), createdTicket.getSpecialization());
    }

    @Test
    void detailsRequest_validId_returnsDetails() throws Exception {
        String ticketDetails = "{\"status\":\"OPENED\",\"description\":\"Description\",\"specialization\":\"Specialization\",\"doctor\":null}";

        ticketRepository.save(new Ticket(1L, null, patient, "Title", "Description", "Specialization", Status.OPENED));
        mockMvc.perform(requestTester.authenticatedGet("/tickets/1"))
                .andExpect(status().isOk())
                .andExpect(content().string(ticketDetails));
    }
}
