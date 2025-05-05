package main

import (
    "fmt"
    "log"
    "net/http"
    
    gorillaHandlers "github.com/gorilla/handlers" // Use alias here
    "github.com/gorilla/mux"
    "github.com/rukenya321/aplusproback/config"
    "github.com/rukenya321/aplusproback/handlers"  // Your handlers
    "github.com/joho/godotenv"
)

func main() {
    // Connect to the DB
    err := godotenv.Load()
    if err != nil {
        log.Println("No .env file found or failed to load")
    }

    config.ConnectDB()

    r := mux.NewRouter()

    // Test Route
    r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Welcome to A+PRO Backend!")
    }).Methods("GET")

    // Login Route
    r.HandleFunc("/login", handlers.LoginHandler).Methods("POST")

    r.HandleFunc("/upload-exam", handlers.UploadExamHandler).Methods("POST")

    r.HandleFunc("/exams", handlers.ExamsHandler).Methods("GET")

    r.HandleFunc("/exams", handlers.StudentExamsHandler).Methods("GET")




    // CORS Middleware
    corsHandler := gorillaHandlers.CORS(
        gorillaHandlers.AllowedOrigins([]string{"*"}),
        gorillaHandlers.AllowedMethods([]string{"GET", "POST", "OPTIONS"}),
        gorillaHandlers.AllowedHeaders([]string{"Content-Type"}),
    )(r)

    fmt.Println("Server running on :8080")
    log.Fatal(http.ListenAndServe("127.0.0.1:8080", corsHandler))
}
