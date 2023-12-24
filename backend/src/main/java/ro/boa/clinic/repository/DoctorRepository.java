package ro.boa.clinic.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ro.boa.clinic.model.Doctor;

import java.util.List;

@Repository
public interface DoctorRepository extends CrudRepository<Doctor, Long> {
    @Query("select specialization from Doctor group by specialization")
    List<String> listAllSpecializations();

    @Query("select (count(1) > 0) from Doctor  where upper(specialization) like upper(:specialization)")
    boolean checkSpecializationExists(@Param("specialization") String specialization);
}
