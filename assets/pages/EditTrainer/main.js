document.addEventListener('DOMContentLoaded', () => {
    let params = new URLSearchParams(window.location.search);
    console.log(params[0])
    let id = params.get('id');
    async function fetchTrainers() {

        try {
            const url = new URL('http://localhost:5000/api/trainer/trainer?id=' + id);

            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const trainers = await response.json();
            const trainer = trainers[0]
            document.getElementById('firstName').value = trainer.firstName;
            document.getElementById('lastName').value = trainer.lastName;
            document.getElementById('phone').value = trainer.phoneNumber;
            document.getElementById('salary').value = trainer.salary;
            document.getElementById('shiftFrom').value = trainer.shiftFrom;
            document.getElementById('shiftTo').value = trainer.shiftTo;
        } catch (error) {
            console.error('Error fetching trainers:', error);
        }
    }

    fetchTrainers()
    const addTrainerForm = document.getElementById('addTrainerForm');


    addTrainerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const shiftFrom = document.getElementById('shiftFrom').value;
        const shiftTo = document.getElementById('shiftTo').value;

        const trainerData = {
            shiftFrom,
            shiftTo
        };

        try {
            const response = await fetch('http://localhost:5000/api/admin/trainer/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : localStorage.getItem('token')
                },
                body: JSON.stringify(trainerData)
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);

            const newTrainer = await response.json();
            console.log('trainer edited:', newTrainer);
            alert('trainer edited')
            window.location.href = "../TrainerList/index.html"
        } catch (error) {
            console.error('Error adding trainer:', error);
        }
    });
});
