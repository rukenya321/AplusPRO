package handlers

import (
    "context"
    "encoding/json"
    "fmt"
    "net/http"

    "github.com/rukenya321/aplusproback/config"
    "github.com/rukenya321/aplusproback/utils"
)

// UploadExamHandler handles exam uploads
func UploadExamHandler(w http.ResponseWriter, r *http.Request) {
    r.ParseMultipartForm(10 << 20) // 10 MB max upload size

    file, fileHeader, err := r.FormFile("exam_file")
    if err != nil {
        http.Error(w, "Error reading file", http.StatusBadRequest)
        return
    }
    defer file.Close()

    // Metadata fields (from form)
    year := r.FormValue("year")
    semester := r.FormValue("semester")
    courseCode := r.FormValue("course")
    unitName := r.FormValue("unit")

    // Lookup course_id
    var courseID string
    query := `SELECT id FROM courses WHERE suffix = $1`
    err = config.DB.QueryRowContext(context.Background(), query, courseCode).Scan(&courseID)
    if err != nil {
        fmt.Printf("Course lookup error: %v\n", err)
        http.Error(w, "Invalid course code", http.StatusBadRequest)
        return
    }

    // Lookup unit_id
    var unitID string
    unitQuery := `SELECT id FROM units WHERE name = $1`
    err = config.DB.QueryRowContext(context.Background(), unitQuery, unitName).Scan(&unitID)
    if err != nil {
        fmt.Printf("Unit lookup error: %v\n", err)
        http.Error(w, "Invalid unit name", http.StatusBadRequest)
        return
    }

    // Path in Supabase Storage (e.g., course/year_semester_unit.pdf)
    objectPath := fmt.Sprintf("%s/%s_%s_%s.pdf", courseCode, year, semester, unitName)

    fmt.Println("Starting file upload to Supabase...")

    // Upload file to Supabase Storage
    err = utils.UploadFileToSupabase(file, fileHeader, objectPath)
    if err != nil {
        fmt.Printf("Upload error: %v\n", err)
        http.Error(w, "Failed to upload file", http.StatusInternalServerError)
        return
    }

    // Save metadata in exams table (without uploaded_by)
    insertQuery := `INSERT INTO exams (year, semester, course_id, unit_id, file_url)
                    VALUES ($1, $2, $3, $4, $5)`

    _, err = config.DB.ExecContext(context.Background(), insertQuery, year, semester, courseID, unitID, objectPath)
    if err != nil {
        fmt.Printf("DB insert error: %v\n", err)
        http.Error(w, "Failed to save exam metadata", http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusOK)
    w.Write([]byte("File uploaded and metadata saved successfully!"))
}

// ExamsHandler lists exams (no uploaded_by filtering)
func ExamsHandler(w http.ResponseWriter, r *http.Request) {
    query := `
        SELECT e.id, u.name, e.file_url, e.uploaded_at
        FROM exams e
        JOIN units u ON e.unit_id = u.id
        ORDER BY e.uploaded_at DESC`

    rows, err := config.DB.QueryContext(context.Background(), query)
    if err != nil {
        http.Error(w, "Failed to query exams", http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    type Exam struct {
        ID         string `json:"id"`
        UnitName   string `json:"unit_name"`
        FileURL    string `json:"file_url"`
        UploadedAt string `json:"uploaded_at"`
    }

    var exams []Exam
    for rows.Next() {
        var exam Exam
        if err := rows.Scan(&exam.ID, &exam.UnitName, &exam.FileURL, &exam.UploadedAt); err != nil {
            http.Error(w, "Error scanning exam", http.StatusInternalServerError)
            return
        }
        exams = append(exams, exam)
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(exams)
}
