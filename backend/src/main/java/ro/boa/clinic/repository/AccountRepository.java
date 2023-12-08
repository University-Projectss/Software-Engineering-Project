package ro.boa.clinic.repository;

import org.springframework.data.repository.CrudRepository;
import ro.boa.clinic.model.Account;

public interface AccountRepository extends CrudRepository<Account, Long> {
    Account findByEmail(String email);
}
