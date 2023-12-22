package ro.boa.clinic.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "The logged-in user does not have access to this resource")
public class UnauthorizedAccessException extends RuntimeException {
}
