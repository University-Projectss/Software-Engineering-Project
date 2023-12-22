package ro.boa.clinic.exception.type;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Account already has profile")
public class AccountAlreadyHasProfile extends RuntimeException {
}
