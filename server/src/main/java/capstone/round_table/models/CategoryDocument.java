/*
 * DISABLED FOR DEPLOYMENT - ELASTICSEARCH NOT AVAILABLE
 * This model class requires ElasticSearch which is not available in production.
 * All search functionality has been temporarily disabled to allow deployment.
 */

/*
package capstone.round_table.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "categories")
public class CategoryDocument {
    @Id
    private int categoryId;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String name;

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
}
*/
