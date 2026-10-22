const API_URL = "https://localhost:3000/fault_reports"

//GET: Retrieve fault report

export function getReports() {
    return fetch(API_URL)
    .then(response => {
        if(!response.ok) {
            throw new Error("Failed to load reports.")
        }

        return response.json();
    })
}