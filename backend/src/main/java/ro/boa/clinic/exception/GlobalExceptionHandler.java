package ro.boa.clinic.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import ro.boa.clinic.exception.type.AccountAlreadyHasProfile;
import ro.boa.clinic.exception.type.PatientProfileNotFoundException;
import ro.boa.clinic.exception.type.TicketNotFoundException;
import ro.boa.clinic.exception.type.UnauthorizedAccessException;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(PatientProfileNotFoundException.class)
    public ResponseEntity<ErrorResponse> handlePatientProfileNotFoundException() {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND,
                "No such patient profile");
        log.error(errorResponse.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<ErrorResponse> handleDoctorSpecializationNotFoundException() {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND,
                "No such doctor specialization");
        log.error(errorResponse.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(TicketNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleTicketNotFoundException() {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND,
                "No such ticket with specified id");
        log.error(errorResponse.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedAccessException() {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.UNAUTHORIZED,
                "The logged-in user do not have access to this resource");
        log.error(errorResponse.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }


    @ExceptionHandler(AccountAlreadyHasProfile.class)
    public ResponseEntity<ErrorResponse> handleAccountAlreadyHasProfileException() {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST,
                "Account already has profile");
        log.error(errorResponse.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

}
