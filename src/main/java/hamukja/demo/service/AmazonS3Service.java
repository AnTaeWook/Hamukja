package hamukja.demo.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import hamukja.demo.amazon.AmazonS3Component;
import hamukja.demo.domain.FileFolder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;

@Component
@RequiredArgsConstructor
public class AmazonS3Service implements FileService{

    private final AmazonS3 amazonS3;
    private final AmazonS3Component amazonS3Component;

    public void uploadFile(InputStream inputStream, ObjectMetadata objectMetadata, String fileName){
        amazonS3.putObject(new PutObjectRequest(amazonS3Component.getBucket(), fileName, inputStream, objectMetadata).withCannedAcl(CannedAccessControlList.PublicReadWrite));
    }

    public byte[] downloadFile(String fileName) {
        try{
            byte[] content;
            final S3Object s3Object = amazonS3.getObject(amazonS3Component.getBucket(), fileName);
            final S3ObjectInputStream stream = s3Object.getObjectContent();
            content = IOUtils.toByteArray(stream);
            s3Object.close();
            return content;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public void deleteFile(String fileName){
        amazonS3.deleteObject(new DeleteObjectRequest(amazonS3Component.getBucket(), fileName));
    }

    public String getFileUrl(String fileName){
        return amazonS3.getUrl(amazonS3Component.getBucket(), fileName).toString();
    }

    public String getFileFolder(FileFolder fileFolder){
        String folder = "";
        if(fileFolder == FileFolder.RECIPE_IMAGES){
            folder = amazonS3Component.getFolderName();
        }
        return folder;
    }
}
