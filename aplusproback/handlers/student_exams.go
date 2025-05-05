package handlers

import (
    "context"
    "encoding/json"
    "fmt"
    "net/http"

    "github.com/rukenya321/aplusproback/config"
)

// StudentExamsHandler lists available exam papers based on course + filters
func StudentExamsHandler(w http.ResponseWriter, r *http.Request) {
    courseCode := r.URL.Query().Get("course")
    year := r.URL.Query().Get("year")
    semester := r.URL.Query().Get("semester")

    if courseCode == "" {
        http.Error(w, "Course code required", http.StatusBadRequest)
        return
    }

    // Lookup course_id from courses table
    var courseID string
    courseQuery := `SELECT id FROM courses WHERE suffix = $1`
    err := config.DB.QueryRowContext(context.Background(), courseQuery, courseCode).Scan(&courseID)
    if err != nil {
        http.Error(w, "Course not found", http.StatusNotFound)
        return
    }

    // Build dynamic query
    query := `
        SELECT e.id, u.name, e.year, e.semester, e.file_url
        FROM exams e
        JOIN units u ON e.unit_id = u.id
        WHERE e.course_id = $1
    `
    args := []interface{}{courseID}
    paramCounter := 2 // $2, $3, etc

    if year != "" {
        query += fmt.Sprintf(" AND e.year = $%d", paramCounter)
        args = append(args, year)
        paramCounter++
    }
    if semester != "" {
        query += fmt.Sprintf(" AND e.semester = $%d", paramCounter)
        args = append(args, semester)
        paramCounter++
    }

    query += " ORDER BY e.uploaded_at DESC"

    // Execute query
    rows, err := config.DB.QueryContext(context.Background(), query, args...)
    if err != nil {
        http.Error(w, "Failed to query exams", http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    type Exam struct {
        ID       string `json:"id"`
        UnitName string `json:"unit_name"`
        Year     int    `json:"year"`
        Semester int    `json:"semester"`
        FileURL  string `json:"file_url"`
    }

    var exams []Exam
    for rows.Next() {
        var exam Exam
        if err := rows.Scan(&exam.ID, &exam.UnitName, &exam.Year, &exam.Semester, &exam.FileURL); err != nil {
            http.Error(w, "Error scanning exam", http.StatusInternalServerError)
            return
        }
        exams = append(exams, exam)
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(exams)
}
