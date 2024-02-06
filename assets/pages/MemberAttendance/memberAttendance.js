// app.js
const attendanceButtons = document.querySelectorAll(".member__edit");
const membersList = document.getElementById("membersList");
const searchForm = document.getElementById("searchForm");

// Dummy data for members (replace with real data)
const members = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Johnson" }
];

// Function to create a new member item
function createMemberItem(member) {
    const memberItem = document.createElement("div");
    memberItem.classList.add("member");
    memberItem.dataset.id = member.id;
    memberItem.innerHTML = `
        <h2 class="member__name">${member.name}</h2>
        <div class="member__actions">
            <button class="member__edit">Attendance</button>
            <button class="member__delete">Delete</button>
        </div>
    `;
    return memberItem;
}

// Function to render members list
function renderMembers() {
    membersList.innerHTML = "";
    members.forEach(member => {
        const memberItem = createMemberItem(member);
        membersList.appendChild(memberItem);
    });
}

// Event delegation for attendance buttons
membersList.addEventListener("click", event => {
    const target = event.target;
    if (target.classList.contains("member__edit")) {
        // Add your logic for marking attendance here
        const memberId = target.closest(".member").dataset.id;
        alert(`Mark Attendance for Member with ID: ${memberId}`);
    } else if (target.classList.contains("member__delete")) {
        // Add your logic for deleting a member here
        const memberId = target.closest(".member").dataset.id;
        alert(`Delete Member with ID: ${memberId}`);
    }
});

// Event listener for search form submission
searchForm.addEventListener("submit", event => {
    event.preventDefault();
    const searchInput = document.getElementById("searchInput").value;
    // Add your logic for searching members here
    alert(`Search query: ${searchInput}`);
});

// Initial rendering of members list
renderMembers();
