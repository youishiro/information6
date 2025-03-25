// Update the date dynamically
document.getElementById("current-date").textContent = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
});

// Load archive from localStorage or use default entries
const defaultArchive = [
    { date: "March 23, 2025", text: "The shortest war in history lasted 38 minutes." },
    { date: "March 22, 2025", text: "Octopuses have three hearts but can’t hear." }
];
let archive = JSON.parse(localStorage.getItem("curiosityArchive")) || defaultArchive;

// Function to render the archive
function renderArchive() {
    const archiveList = document.getElementById("archive-list");
    archiveList.innerHTML = ""; // Clear current list
    archive.forEach(item => {
        const newItem = document.createElement("li");
        newItem.textContent = `${item.date}: ${item.text}`;
        archiveList.appendChild(newItem);
    });
}

// Initial render of archive
renderArchive();

// Handle form submission
document.getElementById("submit-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page refresh
    const curiosity = document.getElementById("curiosity").value.trim();
    if (curiosity) {
        // Add new entry to archive
        const newEntry = {
            date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
            text: curiosity
        };
        archive.unshift(newEntry); // Add to top of array
        localStorage.setItem("curiosityArchive", JSON.stringify(archive)); // Save to localStorage
        renderArchive(); // Update the displayed list
        document.getElementById("curiosity").value = ""; // Clear the textarea
        document.getElementById("submit-message").style.display = "block"; // Show thank-you message
        setTimeout(() => {
            document.getElementById("submit-message").style.display = "none"; // Hide after 3 seconds
        }, 3000);
    }
});