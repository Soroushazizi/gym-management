// scripts.js
const addTrainerBtn = document.getElementById("addTrainerBtn");
const trainersList = document.getElementById("trainersList");

// Dummy data for trainers (replace with real data)
const trainers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Johnson" }
];

// Function to create a new trainer item
function createTrainerItem(trainer) {
    const trainerItem = document.createElement("div");
    trainerItem.classList.add("trainer-item");
    trainerItem.innerHTML = `
        <span>${trainer.name}</span>
        <div>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;
    return trainerItem;
}

// Function to render trainers list
function renderTrainers() {
    trainersList.innerHTML = "";
    trainers.forEach(trainer => {
        const trainerItem = createTrainerItem(trainer);
        trainersList.appendChild(trainerItem);
    });
}

// Event listener for add trainer button
addTrainerBtn.addEventListener("click", () => {
    // Add your logic for adding a new trainer here
    alert("Add Trainer button clicked!");
});

// Event delegation for edit and delete buttons
trainersList.addEventListener("click", event => {
    const target = event.target;
    if (target.classList.contains("edit-btn")) {
        // Add your logic for editing a trainer here
        const trainerId = target.closest(".trainer-item").dataset.id;
        alert(`Edit Trainer with ID: ${trainerId}`);
    } else if (target.classList.contains("delete-btn")) {
        // Add your logic for deleting a trainer here
        const trainerId = target.closest(".trainer-item").dataset.id;
        alert(`Delete Trainer with ID: ${trainerId}`);
    }
});

// Initial rendering of trainers list
renderTrainers();
