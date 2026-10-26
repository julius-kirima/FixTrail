
import { submitReport } from "./api.js";

const faultForm = document.querySelector("#fault-form");
const formMessage = document.querySelector("#form-message");

faultForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const report = {
        student_name: document.querySelector("#student-name").value.trim(),
        title: document.querySelector("#fault-title").value.trim(),
        category: document.querySelector("#fault-category").value,
        location: document.querySelector("#fault-location").value.trim(),
        description: document.querySelector("#fault-description").value.trim(),
        status: "open",
        created_at: new Date().toISOString()
    };

    submitReport(report)
        .then(function () {
            formMessage.textContent = "Fault report submitted successfully.";
            formMessage.className = "success-message";
            faultForm.reset();
        })
        .catch(function (error) {
            console.error("Submission error:", error);
            formMessage.textContent =
                "Unable to submit your report. Please try again.";
            formMessage.className = "error-message";
        });
});

// TRACK FAULT REPORT STATUS

const trackForm = document.querySelector("#track-form");
const trackMessage = document.querySelector("#track-message");
const trackResult = document.querySelector("#track-result");

trackForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const reportId = document.querySelector("#report-id").value.trim();

    fetch("https://raw.githubusercontent.com/julius-kirima/FixTrail/main/db.json")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Failed to load reports.");
            }

            return response.json();
        })
        .then(function (data) {
            const report = data.fault_reports.find(function (item) {
                return String(item.id) === reportId;
            });

            if (!report) {
                throw new Error("Report not found.");
            }

            trackMessage.textContent = "Report found.";
            trackResult.textContent =
                `Fault: ${report.title} | Status: ${report.status.replace("_", " ")}`;
        })
        .catch(function (error) {
            console.error("Tracking error:", error);
            trackMessage.textContent =
                "Unable to find that report. Check the ID and try again.";
            trackResult.textContent = "";
        });
});
