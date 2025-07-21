package capstone.round_table.models;

import java.util.Objects;

public class Category {
    private int categoryId;
    private String name;

    public Category() {
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Category category1 = (Category) o;
        return categoryId == category1.categoryId && Objects.equals(name, category1.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(categoryId, name);
    }
}
