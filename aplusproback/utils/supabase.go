package utils

import (
    "bytes"
    "fmt"
    "io"
    "mime/multipart"
    "net/http"
    "os"
	"time"
)


// UploadFileToSupabase uploads a file to Supabase Storage
func UploadFileToSupabase(file multipart.File, fileHeader *multipart.FileHeader, objectPath string) error {
    defer file.Close()

    supabaseURL := os.Getenv("SUPABASE_URL")          // e.g., https://your-project.supabase.co
    supabaseKey := os.Getenv("SUPABASE_SERVICE_KEY")  // Service role key (for uploads)
    bucket := "exam-papers"

    uploadURL := fmt.Sprintf("%s/storage/v1/object/%s/%s", supabaseURL, bucket, objectPath)

    // Prepare file data
    buf := new(bytes.Buffer)
    io.Copy(buf, file)

    req, err := http.NewRequest("PUT", uploadURL, buf)

    if err != nil {
        return err
    }

    req.Header.Set("Authorization", "Bearer "+supabaseKey)
    req.Header.Set("Content-Type", "application/octet-stream")

    client := &http.Client{
		Timeout: 60 * time.Second,  // <-- Set timeout to 60 seconds
	}
	
    resp, err := client.Do(req)
    if err != nil {
        return err
    }
    defer resp.Body.Close()

    if resp.StatusCode >= 300 {
		bodyBytes, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("upload failed with status: %s, body: %s", resp.Status, string(bodyBytes))
	}	
	

    return nil
}
