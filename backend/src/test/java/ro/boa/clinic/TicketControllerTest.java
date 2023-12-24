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
import ro.boa.clinic.dto.TicketUpdateRequestDto;
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
        var account = accountService.createDoctorAccount("user6@example.com","Password6");
        doctorService.createDoctorProfile("John", "Doe", "Ophthalmology", account.getEmail());

        var ticketDto = new TicketCreationRequestDto("Title", "Description", "Specialization");

        mockMvc.perform(requestTester.authenticatedPost("/tickets", ticketDto))
                .andExpect(status().isBadRequest());
    }

    @Test
    void creationRequest_validData_createsTicket() throws Exception {
        var account = accountService.createDoctorAccount("user6@example.com","Password6");
        doctorService.createDoctorProfile("John", "Doe", "Specialization", account.getEmail());

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

    @Test
    void ticketListRequest_validUser_returnsTicketList() throws Exception {
        String ticketList = "[{\"id\":1,\"doctor\":null,\"title\":\"Title\",\"description\":\"Description\",\"specialization\":\"Specialization\",\"status\":\"OPENED\"},"
                + "{\"id\":2,\"doctor\":null,\"title\":\"Title1\",\"description\":\"Description1\",\"specialization\":\"Specialization1\",\"status\":\"OPENED\"}]";

        ticketRepository.save(new Ticket(1L, null, patient, "Title", "Description", "Specialization", Status.OPENED));
        ticketRepository.save(new Ticket(2L, null, patient, "Title1", "Description1", "Specialization1", Status.OPENED));

        mockMvc.perform(requestTester.authenticatedGet("/tickets"))
                .andExpect(status().isOk())
                .andExpect(content().string(ticketList));
    }

    @Test
    void updateTicketRequest_validId_updatesTicket() throws Exception {
        Ticket savedTicket = ticketRepository.save(new Ticket(1L, null, patient, "Title", "Description", "Specialization", Status.OPENED));

        String newTicketTitle = "Nu vad la departare";
        String newTicketDescription = "Ma joc toata ziua pe caluculator tomb raider";
        Status newTicketStatus = Status.CLOSED;

        TicketUpdateRequestDto ticketUpdateRequestDto = new TicketUpdateRequestDto(1L, newTicketTitle, newTicketDescription, Status.CLOSED, null);
        mockMvc.perform(requestTester.authenticatedPost("/update_ticket", ticketUpdateRequestDto))
                .andExpect(status().isOk());

        assertEquals(savedTicket.getTitle(), newTicketTitle);
        assertEquals(savedTicket.getDescription(), newTicketDescription);
        assertEquals(savedTicket.getStatus(), newTicketStatus);

    }
}
