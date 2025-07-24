package capstone.round_table.domain;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class S3Service {
    @Autowired
    private AmazonS3 amazonS3;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;


    public String uploadFile(MultipartFile file, String folder) throws IOException {
        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String uniqueFilename = UUID.randomUUID().toString() + extension;
        String key = folder + "/" + uniqueFilename;

        // Create object metadata
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());

        // Upload file
        PutObjectRequest request = new PutObjectRequest(
            bucketName,
            key,
            file.getInputStream(),
            metadata
        );

        amazonS3.putObject(request);

        // Return the file URL
        return getFileUrl(key);
    }

    public String getFileUrl(String key) {
        return amazonS3.getUrl(bucketName, key).toString();
    }

    public void deleteFile(String key) {
        amazonS3.deleteObject(bucketName, key);
    }

    public boolean fileExists(String key) {
        return amazonS3.doesObjectExist(bucketName, key);
    }

    // Extract key from full URL for deletion
    public String extractKeyFromUrl(String url) {
        if (url == null || url.isEmpty()) {
            return null;
        }

        // AWS URLs: https://bucket-name.s3.region.amazonaws.com/folder/filename
        if (url.contains(bucketName)) {
            int bucketIndex = url.indexOf(bucketName);
            int keyStartIndex = url.indexOf("/", bucketIndex + bucketName.length()) + 1;
            return url.substring(keyStartIndex);
        }

        return null;
    }
}
