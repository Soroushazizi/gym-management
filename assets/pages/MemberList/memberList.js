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

            const editButton = document.createElement('a');
            editButton.className = 'member__edit';
            editButton.textContent = 'Edit';
            editButton.href = "../EditMember/index.html?id=" + member._id
            memberActions.appendChild(editButton);

            const deleteButton = document.createElement('a');
            deleteButton.className = 'member__delete';
            deleteButton.textContent = 'Delete';
            memberActions.appendChild(deleteButton);

            deleteButton.addEventListener("click", event => {
                deleteItem(member._id)
            });

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


async function deleteItem(id) {
    const response = await fetch('http://localhost:5000/api/admin/member/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization' : localStorage.getItem('token')
        }
    });

    if (response.ok) {
        alert('Deleted')
        window.location.reload()
    } else if (response.status === 404) {
        alert('User not registered');
    } else {
        console.error(`Error: ${response.status}`);
    }
}