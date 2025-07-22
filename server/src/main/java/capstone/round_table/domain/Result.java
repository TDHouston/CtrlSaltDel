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

    public List<String> getMessages() {
        return new ArrayList<>(errors);
    }

    public void addMessage(String message, ResultType type) {
        errors.add(message);
        this.type = type;
    }

    public boolean isSuccess() {
        return type == ResultType.SUCCESS;
    }
}
