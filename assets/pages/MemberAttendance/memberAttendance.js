document.addEventListener('DOMContentLoaded', () => {
    fetchmembers();
});

const membersList = document.getElementById("membersList");

// Fetch members from the server and display them
async function fetchmembers(query = {}) {
    try {
        const url = new URL('http://localhost:5000/api/member/member');
        url.search = new URLSearchParams(query).toString();

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const members = await response.json();

        const membersList = document.getElementById('membersList');
        membersList.innerHTML = ''; // Clear the list

        members.forEach(member => {
            const memberDiv = document.createElement('div');
            memberDiv.className = 'member';

            const memberName = document.createElement('h2');
            memberName.className = 'member__name';
            memberName.textContent = member.firstName;
            memberDiv.appendChild(memberName);

            const memberLastName = document.createElement('h2');
            memberLastName.className = 'member__lname';
            memberLastName.textContent = member.lastName;
            memberDiv.appendChild(memberLastName);

            const phoneNumber = document.createElement('h4');
            phoneNumber.className = 'member__age';
            phoneNumber.textContent = member.phoneNumber;
            memberDiv.appendChild(phoneNumber);

            const memberActions = document.createElement('div');
            memberActions.className = 'member__actions';
            memberDiv.appendChild(memberActions);

            const attendance = document.createElement('a');
            attendance.className = 'member__attended';
            attendance.textContent = 'Attendance';
            attendance.href = "../Attendance/index.html?id=" + member._id
            memberActions.appendChild(attendance);

            membersList.appendChild(memberDiv);
        });
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}


// Fetch members when the search form is submitted
document.getElementById('searchForm').addEventListener('submit', event => {
    event.preventDefault();

    const searchInput = document.getElementById('searchInput').value;
    fetchmembers({name: searchInput});
});
