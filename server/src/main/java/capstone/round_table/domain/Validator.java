package capstone.round_table.domain;

import org.springframework.stereotype.Component;

@Component
public class Validator {

    /**
     * Checks if number value is greater than zero, which indicates valid value.
     * @param num
     * @param type
     * @param result
     */
    protected <T> void validate(int num, String type, Result<T> result) {
        // https://docs.oracle.com/javase/8/docs/api/java/util/function/Function.html
        // https://docs.oracle.com/javase/tutorial/java/javaOO/methodreferences.html
        if (num <= 0) {
            result.addError(
                String.format("%s must be greater than zero.", type),
                ResultType.INVALID
            );
        }
    }

}
