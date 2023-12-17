package ro.boa.clinic.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ro.boa.clinic.model.Account;
import ro.boa.clinic.model.Patient;

@Repository
public interface PatientRepository extends CrudRepository<Patient, Long> {
    Patient findByAccount(Account account);
}
