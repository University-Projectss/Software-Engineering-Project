package ro.boa.clinic.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ro.boa.clinic.model.Ticket;

@Repository
public interface TicketRepository extends CrudRepository<Ticket, Long> {
    Ticket findByTitle(String title);
}
