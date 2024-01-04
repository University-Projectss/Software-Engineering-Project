package ro.boa.clinic.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ro.boa.clinic.model.Doctor;
import ro.boa.clinic.model.Patient;
import ro.boa.clinic.model.Status;
import ro.boa.clinic.model.Ticket;

import java.util.List;

@Repository
public interface TicketRepository extends CrudRepository<Ticket, Long> {
    Ticket findByTitle(String title);

    List<Ticket> getTicketsByDoctorAndStatus(Doctor doctor, Status status);

    List<Ticket> getTicketsByDoctor(Doctor doctor);

    List<Ticket> getTicketsByPatient(Patient patient);

    @EntityGraph(type = EntityGraph.EntityGraphType.FETCH, attributePaths = {"doctor"})
    Ticket getTicketById(Long id);

    @Modifying
    @Query("UPDATE Ticket t SET t.doctor = (SELECT d FROM Doctor d WHERE d.specialization = t.specialization ORDER BY (SELECT COUNT(t1.id) FROM Ticket t1 WHERE t1.doctor IS NOT NULL AND  t1.status = 'OPENED' AND  t1.doctor = d) ASC limit 1) WHERE t.id = :ticketId")
    int AssignDoctorToTicket(@Param("ticketId") Long ticketId);

    List<Ticket> getTicketsByPatientAndStatus(Patient patient, Status status);
}
