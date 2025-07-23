package capstone.round_table.domain;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class Validator {
    // https://docs.oracle.com/javase/8/docs/api/java/util/function/Function.html
    // https://docs.oracle.com/javase/tutorial/java/javaOO/methodreferences.html

    /**
     * Checks if integer value is greater than zero, which indicates valid value.
     * @param num
     * @param type
     * @param result
     * @param <T>
     */
    protected <T> void validate(int num, String type, Result<T> result) {
        if (num <= 0) {
            result.addError(
                String.format("%s must be greater than zero.", type),
                ResultType.INVALID
            );
        }
    }

    /**
     * Checks if BigDecimal value is greater than zero, which indicates valid value.
     * @param num
     * @param type
     * @param result
     * @param <T>
     */
    protected <T> void validate(BigDecimal num, String type, Result<T> result) {
        if (num.compareTo(BigDecimal.ZERO) == 0 || num.compareTo(BigDecimal.ZERO) == -1) {
            result.addError(
                String.format("%s must be greater than zero.", type),
                ResultType.INVALID
            );
        }
    }

}
