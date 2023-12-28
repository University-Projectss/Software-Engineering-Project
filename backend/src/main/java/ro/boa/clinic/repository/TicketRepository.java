package ro.boa.clinic.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ro.boa.clinic.model.Doctor;
import ro.boa.clinic.model.Patient;
import ro.boa.clinic.model.Status;
import ro.boa.clinic.model.Ticket;

import java.util.List;

@Repository
public interface TicketRepository extends CrudRepository<Ticket, Long> {
    Ticket findByTitle(String title);

    List<Ticket> getTicketsByDoctorAndStatusIs(Doctor doctor, Status status);

    List<Ticket> getTicketsByPatientAndStatusIs(Patient patient, Status status);
}
