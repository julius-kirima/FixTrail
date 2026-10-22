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

// POST: Submit a new fault report
export function submitReport(report) {
    return fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(report)
    }).then(response => {
        if(!response.ok) {
            throw new Error("Failed to submit report.");
        }

        return response
    })
}