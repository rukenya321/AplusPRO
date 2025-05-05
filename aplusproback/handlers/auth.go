package handlers

import (
    "encoding/json"
    "net/http"
    "context"
    "database/sql"

    "github.com/rukenya321/aplusproback/config"
    "golang.org/x/crypto/bcrypt"
)

// LoginRequest struct
type LoginRequest struct {
    UserID   string `json:"user_id"`
    Password string `json:"password"`
}

// LoginHandler processes login
func LoginHandler(w http.ResponseWriter, r *http.Request) {
    var req LoginRequest
    err := json.NewDecoder(r.Body).Decode(&req)
    if err != nil {
        http.Error(w, "Invalid request", http.StatusBadRequest)
        return
    }

    var hashedPassword, role string

    // Case-insensitive query
    query := `SELECT password, role FROM users WHERE LOWER(user_id) = LOWER($1)`
    err = config.DB.QueryRowContext(context.Background(), query, req.UserID).Scan(&hashedPassword, &role)
    
    if err == sql.ErrNoRows {
        http.Error(w, "User not found", http.StatusUnauthorized)
        return
    } else if err != nil {
        http.Error(w, "Internal server error", http.StatusInternalServerError)
        return
    }

    // Password check
    if bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(req.Password)) != nil {
        http.Error(w, "Wrong password", http.StatusUnauthorized)
        return
    }

    // Success response
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{
        "message": "Login successful",
        "role": role,
    })
}

