const API_URL = "https://julius-kirima.github.io/FixTrail/db.json";

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