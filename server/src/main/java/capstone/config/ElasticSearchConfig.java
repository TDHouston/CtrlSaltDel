/*
 * DISABLED FOR DEPLOYMENT - ELASTICSEARCH NOT AVAILABLE
 * This configuration requires ElasticSearch which is not available in production.
 * All search functionality has been temporarily disabled to allow deployment.
 */

/*
package capstone.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@Configuration
@ConditionalOnProperty(
    name = "elasticsearch.enabled",
    havingValue = "true",
    matchIfMissing = false
)
@EnableElasticsearchRepositories(basePackages = "capstone.repositories.elasticsearch")
public class ElasticSearchConfig {
    // ElasticSearch configuration will only be loaded if elasticsearch.enabled=true
}
*/