document.addEventListener('DOMContentLoaded', () => {
    fetchTrainers();
});

const trainersList = document.getElementById("trainersList");

// Fetch trainers from the server and display them
async function fetchTrainers(query = {}) {
    try {
        const url = new URL('http://localhost:5000/api/trainer/trainer');
        url.search = new URLSearchParams(query).toString();

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const trainers = await response.json();

        const trainersList = document.getElementById('trainersList');
        trainersList.innerHTML = ''; // Clear the list

        trainers.forEach(trainer => {
            const trainerDiv = document.createElement('div');
            trainerDiv.className = 'trainer';

            const trainerName = document.createElement('h2');
            trainerName.className = 'trainer__name';
            trainerName.textContent = trainer.firstName;
            trainerDiv.appendChild(trainerName);

            const trainerLastName = document.createElement('h2');
            trainerLastName.className = 'trainer__lname';
            trainerLastName.textContent = trainer.lastName;
            trainerDiv.appendChild(trainerLastName);

            const salary = document.createElement('h3');
            salary.className = 'trainer__salary';
            salary.textContent = trainer.salary;
            trainerDiv.appendChild(salary);

            const shiftFrom = document.createElement('h4');
            shiftFrom.className = 'trainer__sf';
            shiftFrom.textContent = trainer.shiftFrom;
            trainerDiv.appendChild(shiftFrom);

            const shiftTo = document.createElement('h4');
            shiftTo.className = 'trainer__st';
            shiftTo.textContent = trainer.shiftTo;
            trainerDiv.appendChild(shiftTo);

            const trainerActions = document.createElement('div');
            trainerActions.className = 'trainer__actions';
            trainerDiv.appendChild(trainerActions);

            const Hire = document.createElement('a');
            Hire.className = 'trainer__Hire';
            Hire.textContent = 'Hire';
            trainerActions.appendChild(Hire);

            Hire.addEventListener("click", event => {
                HireTrainer(trainer._id)
            });

            trainersList.appendChild(trainerDiv);
        });
    } catch (error) {
        console.error('Error fetching trainers:', error);
    }
}


// Fetch trainers when the search form is submitted
document.getElementById('searchForm').addEventListener('submit', event => {
    event.preventDefault();

    const searchInput = document.getElementById('searchInput').value;
    fetchTrainers({name: searchInput});
});


async function HireTrainer(id) {
    const response = await fetch('http://localhost:5000/api/member/payment/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization' : localStorage.getItem('token')
        }
    });

    if (response.ok) {
        alert('Hired')
        window.location.reload()
    } else if (response.status === 404) {
        alert('User not registered');
    } else {
        console.error(`Error: ${response.status}`);
    }
}