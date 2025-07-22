package capstone.round_table.domain;

import java.util.ArrayList;
import java.util.List;

public class Result<T> {
    private final ArrayList<String> errors = new ArrayList<>();
    private T payload;
    private ResultType type = ResultType.SUCCESS;

    public ResultType getType() {
        return type;
    }

    public T getPayload() {
        return payload;
    }

    public void setPayload(T payload) {
        this.payload = payload;
    }

    public List<String> getErrors() {
        return new ArrayList<>(errors);
    }

    public void addError(String error, ResultType type) {
        errors.add(error);
        this.type = type;
    }

    public boolean isSuccess() {
        return type == ResultType.SUCCESS;
    }
}
