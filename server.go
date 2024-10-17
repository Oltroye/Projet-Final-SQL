package main

import (
	"database/sql"
	"fmt"
	"net/http"
)

func OpenDb(path string, w http.ResponseWriter, r *http.Request) *sql.DB {
	// Open a connection to the SQLite database with foreign key constraints enabled.
	db, err := sql.Open("sqlite3", path+"?_foreign_keys=on")
	// Check if there was an error opening the database connection.
	if err != nil {
		fmt.Println("allDB OpenDb 1 :", err)
		http.Redirect(w, r, "/500", http.StatusSeeOther)
		return nil
	}
	// Ping the database to ensure the connection is valid.
	if err = db.Ping(); err != nil {
		fmt.Println("allDB OpenDb 2 :", err)
		http.Redirect(w, r, "/500", http.StatusSeeOther)
		return nil
	}
	// Return the database connection object.
	return db
}
func main() {

	fmt.Println("server successfully up, go to http://localhost:8080")

	// Serve static files for resources like CSS, JavaScript, etc.
	fs := http.FileServer(http.Dir("VIEWS/static"))
	http.Handle("/static/", http.StripPrefix("/static", fs))

	// Set URL handlers for different routes.
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		db := OpenDb("./DATA/User_data.db", w, r)
		client.InitDb(db, w, r)
		defer db.Close()
	})
	// Start the HTTP server on port 8080.
	http.ListenAndServe(":8080", nil)
}
