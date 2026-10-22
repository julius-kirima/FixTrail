import { getReports } from "./api.js";

const faultList = document.querySelector("#fault-list");
const message = document.querySelector("#dashboard-message");
const filter = document.querySelector("#status-filter");

function updateStats(reports) {
    document.querySelector("#total-reports").textContent = reports.length;
    document.querySelector("#open-reports").textContent =
        reports.filter(r => r.status === "open").length;
    document.querySelector("#progress-reports").textContent =
        reports.filter(r => r.status === "in_progress").length;
    document.querySelector("#resolved-reports").textContent =
        reports.filter(r => r.status === "resolved").length;
}

function displayReports(reports) {
    faultList.innerHTML = "";

    if (!reports.length) {
        faultList.innerHTML = '<tr><td colspan="8">No reports found.</td></tr>';
        return;
    }

    reports.forEach(report => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${report.student_name}</td>
            <td>${report.title}</td>
            <td>${report.category}</td>
            <td>${report.location}</td>
            <td>${report.description}</td>
            <td>${new Date(report.created_at).toLocaleDateString()}</td>
            <td>${report.status.replace("_", " ")}</td>
            <td>
                <select class="status-update" data-id="${report.id}">
                    <option value="open" ${report.status === "open" ? "selected" : ""}>Open</option>
                    <option value="in_progress" ${report.status === "in_progress" ? "selected" : ""}>In Progress</option>
                    <option value="resolved" ${report.status === "resolved" ? "selected" : ""}>Resolved</option>
                </select>
                <button class="update-status" data-id="${report.id}">Update</button>
            </td>`;

        faultList.appendChild(row);
    });
}

function loadReports() {
    getReports()
        .then(reports => {
            updateStats(reports);
            displayReports(filter.value === "all"
                ? reports
                : reports.filter(r => r.status === filter.value));
            message.textContent = "";
        })
        .catch(error => {
            console.error(error);
            message.textContent = "Unable to load reports. Please try again.";
        });
}

filter.addEventListener("change", loadReports);
document.querySelector("#refresh-reports").addEventListener("click", loadReports);

faultList.addEventListener("click", event => {
    if (!event.target.classList.contains("update-status")) return;

    const id = event.target.dataset.id;
    const status = faultList.querySelector(`.status-update[data-id="${id}"]`).value;

    fetch(`http://localhost:3000/fault_reports/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
    })
        .then(response => {
            if (!response.ok) throw new Error("Update failed");
            return response.json();
        })
        .then(() => {
            message.textContent = "Status updated successfully.";
            loadReports();
        })
        .catch(error => {
            console.error(error);
            message.textContent = "Unable to update status.";
        });
});

loadReports();