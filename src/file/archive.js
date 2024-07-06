/**]
 import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class ZipUtils {

    public static boolean zip(String path, String path2, String password) {
        File fileToZip = new File(path);
        File zipFile = new File(path2);

        // 파일 또는 디렉토리가 존재하지 않으면 압축 실패
        if (!fileToZip.exists()) {
            return false;
        }

        try {
            FileOutputStream fos = new FileOutputStream(zipFile);
            ZipOutputStream zos = new ZipOutputStream(fos);

            if (password != null && !password.isEmpty()) {
                zos.setMethod(ZipOutputStream.DEFLATED);
                zos.setEncryptionMethod(ZipOutputStream.STANDARD_ENCRYPTION);
                zos.setPassword(password.toCharArray());
            }

            if (fileToZip.isDirectory()) {
                zipDirectory(fileToZip, fileToZip.getName(), zos);
            } else {
                zipFile(fileToZip, fileToZip.getName(), zos);
            }

            zos.close();
            fos.close();

            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    private static void zipFile(File fileToZip, String fileName, ZipOutputStream zos) throws IOException {
        FileInputStream fis = new FileInputStream(fileToZip);
        ZipEntry zipEntry = new ZipEntry(fileName);
        zos.putNextEntry(zipEntry);

        byte[] bytes = new byte[1024];
        int length;
        while ((length = fis.read(bytes)) >= 0) {
            zos.write(bytes, 0, length);
        }

        zos.closeEntry();
        fis.close();
    }

    private static void zipDirectory(File dirToZip, String baseName, ZipOutputStream zos) throws IOException {
        File[] files = dirToZip.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    zipDirectory(file, baseName + File.separator + file.getName(), zos);
                } else {
                    zipFile(file, baseName + File.separator + file.getName(), zos);
                }
            }
        }
    }

    public static void main(String[] args) {
        String path = "your_source_path_here";
        String path2 = "your_target_zip_path_here";
        String password = "your_password_here"; // Optional, leave empty if not needed

        boolean success = zip(path, path2, password);

        if (success) {
            System.out.println("Compression successful.");
        } else {
            System.out.println("Compression failed.");
        }
    }
}

 */