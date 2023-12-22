package ro.boa.clinic.exception.type;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "No such Patient Profile")
public class PatientProfileNotFoundException extends RuntimeException {
}
