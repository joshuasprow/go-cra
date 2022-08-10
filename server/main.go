package main

import "net/http"

func hello(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message":"hello"}`))
}

func main() {
	m := http.NewServeMux()

	m.Handle("/", http.FileServer(http.Dir(".")))
	m.Handle("/api/hello", http.HandlerFunc(hello))

	s := &http.Server{
		Handler: m,
		Addr:    ":8081",
	}

	if err := s.ListenAndServe(); err != nil {
		panic(err)
	}
}
