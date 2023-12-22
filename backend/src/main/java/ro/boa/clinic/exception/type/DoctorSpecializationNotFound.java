package ro.boa.clinic.exception.type;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "No such Doctor Specialization")
public class DoctorSpecializationNotFound extends RuntimeException{
}
