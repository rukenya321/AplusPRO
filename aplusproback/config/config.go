package config

import (
    "context"
    "fmt"
    "log"
    "net"
    "time"

    "github.com/jackc/pgx/v5"
    "github.com/jackc/pgx/v5/stdlib"
    "database/sql"
)

var DB *sql.DB

func ConnectDB() {
    dsn := "postgresql://postgres.tvjgmnmsokytgawsfwcq:%40Rukenya1961%23@aws-0-eu-central-1.pooler.supabase.com:5432/postgres?sslmode=require"



    // Custom Dialer to force IPv4
    config, err := pgx.ParseConfig(dsn)
    if err != nil {
        log.Fatal("Error parsing config:", err)
    }

    config.DialFunc = func(ctx context.Context, network, addr string) (net.Conn, error) {
        d := net.Dialer{Timeout: 5 * time.Second}
        return d.DialContext(ctx, "tcp4", addr) // Force IPv4
    }

    DB = stdlib.OpenDB(*config)

    // Test the connection
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    if err := DB.PingContext(ctx); err != nil {
        log.Fatal("Error connecting to the database:", err)
    }

    fmt.Println("Successfully connected to the database!")
}
