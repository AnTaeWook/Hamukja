package hamukja.demo.service;

import com.amazonaws.services.s3.model.ObjectMetadata;
import hamukja.demo.domain.FileFolder;

import java.io.InputStream;

public interface FileService {

    void uploadFile(InputStream inputStream, ObjectMetadata objectMetadata, String fileName);

    void deleteFile(String fileName);

    byte[] downloadFile(String fileName);

    String getFileUrl(String fileName);

    String getFileFolder(FileFolder fileFolder);
}
