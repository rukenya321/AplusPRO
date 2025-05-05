package main

import (
    "database/sql"
    "fmt"
    "log"

    _ "github.com/jackc/pgx/v5/stdlib"
    "golang.org/x/crypto/bcrypt"
)

func main() {
    // Supabase Shared Pooler connection string
    dsn := "postgresql://postgres.tvjgmnmsokytgawsfwcq:%40Rukenya1961%23@aws-0-eu-central-1.pooler.supabase.com:5432/postgres?sslmode=require"

    db, err := sql.Open("pgx", dsn)
    if err != nil {
        log.Fatal("Failed to open DB:", err)
    }
    defer db.Close()

    // Users to seed
    users := []struct {
        userID       string
        plainPassword string
        role         string
        courseID     string
    }{
        {"GS200324BED", "student123", "student", "b56f1c35-ca4c-468a-92d6-45eedd42cc63"},
        {"LEC001IT", "lec1", "lecturer", "49e33a8c-2e38-4a7c-b171-24f502663ecf"},
        {"ADMIN001", "adminpass", "admin", ""}, // Admin has no course_id
    }

    for _, user := range users {
        hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.plainPassword), bcrypt.DefaultCost)
        if err != nil {
            log.Fatalf("Failed to hash password for %s: %v", user.userID, err)
        }

        var query string
        var args []interface{}

        if user.role == "admin" {
            query = `INSERT INTO users (id, user_id, password, role)
                     VALUES (gen_random_uuid(), $1, $2, $3)
                     ON CONFLICT (user_id) DO NOTHING`
            args = []interface{}{user.userID, string(hashedPassword), user.role}
        } else {
            query = `INSERT INTO users (id, user_id, password, role, course_id)
                     VALUES (gen_random_uuid(), $1, $2, $3, $4)
                     ON CONFLICT (user_id) DO NOTHING`
            args = []interface{}{user.userID, string(hashedPassword), user.role, user.courseID}
        }

        _, err = db.Exec(query, args...)
        if err != nil {
            log.Fatalf("Failed to insert user %s: %v", user.userID, err)
        }

        fmt.Printf("User %s seeded successfully!\n", user.userID)
    }
}
