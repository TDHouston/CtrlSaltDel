package capstone.round_table.controllers;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.sql.SQLIntegrityConstraintViolationException;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleException(DataIntegrityViolationException ex) {
        if (ex.toString().contains("Duplicate entry")) {
            return ErrorResponse.build("This email is already in use!", HttpStatus.CONFLICT);
        }
        return ErrorResponse.build("Something went wrong");
    }
}
