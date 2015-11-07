package main

import (
	"fmt"
	"html/template"
	"net/http"
	"os"
)

var _homeTemplate *template.Template

func handler(w http.ResponseWriter, r *http.Request) {
	var err error

	_homeTemplate, err = template.ParseFiles("assets/templates/home.html")
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	if err := _homeTemplate.Execute(w, struct{}{}); err != nil {
		http.Error(w, err.Error(), 500)
	}
}

func main() {
	http.Handle("/public/", cacheStatic(http.StripPrefix("/public/", http.FileServer(http.Dir("assets")))))
	http.HandleFunc("/", handler)
	port := ":" + os.Getenv("PORT")
	if port == ":" {
		port = ":8080"
	}
	http.ListenAndServe(port, nil)
}

func cacheStatic(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Cache-Control", fmt.Sprintf("max-age=%d, public", 86400))
		h.ServeHTTP(w, r)
	})
}
