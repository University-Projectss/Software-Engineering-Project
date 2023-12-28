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

    List<Ticket> getTicketsByDoctorAndStatus(Doctor doctor, Status status);

    List<Ticket> getTicketsByDoctor(Doctor doctor);

    List<Ticket> getTicketsByPatient(Patient patient);

    List<Ticket> getTicketsByPatientAndStatus(Patient patient, Status status);
}
