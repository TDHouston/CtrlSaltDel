package capstone.round_table.controllers;

import capstone.round_table.domain.Result;
import capstone.round_table.domain.ResultType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

public class ErrorResponse {

    private final LocalDateTime timestamp = LocalDateTime.now();
    private String message;

    public ErrorResponse(String message) {
        this.message = message;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public String getMessage() {
        return message;
    }

    public static ResponseEntity<ErrorResponse> build(String message) {
        return new ResponseEntity<>(new ErrorResponse(message), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public static ResponseEntity<ErrorResponse> build(String message, HttpStatus status) {
        return new ResponseEntity<>(new ErrorResponse(message), status);
    }

    public static <T> ResponseEntity<Object> build(Result<T> result) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        if (result.getType() == null ||
            result.getType() == ResultType.INVALID ||
            result.getType() == ResultType.DUPLICATE ||
            result.getType() == ResultType.MISSING_INFO
        ) {
            status = HttpStatus.BAD_REQUEST;
        } else if (result.getType() == ResultType.NOT_FOUND) {
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(result.getErrors(), status);
    }
}