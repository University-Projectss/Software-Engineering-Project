package ro.boa.clinic.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ro.boa.clinic.model.Doctor;

import java.util.List;

@Repository
public interface DoctorRepository extends CrudRepository<Doctor, Long> {
    @Query("select specialization from Doctor group by specialization")
    List<String> listAllSpecializations();

    @Query("SELECT d FROM Doctor d JOIN Account a ON d.id = a.profile.id WHERE a.email = :email")
    Doctor findDoctorProfileByEmail(String email);
}
