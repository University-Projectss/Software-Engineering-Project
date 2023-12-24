package ro.boa.clinic.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "No such ticket with specified id")
public class TicketNotFoundException extends RuntimeException {
}
