document.addEventListener('DOMContentLoaded', () => {
    const addTrainerForm = document.getElementById('addTrainerForm');

    addTrainerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const phone = document.getElementById('phone').value;
        const salary = document.getElementById('salary').value;
        const shiftFrom = document.getElementById('shiftFrom').value;
        const shiftTo = document.getElementById('shiftTo').value;
        const password = document.getElementById('password').value;

        const trainerData = {
            firstName,
            lastName,
            phone,
            salary,
            shiftFrom,
            shiftTo,
            role: 'trainer',
            password,
            username
        };

        try {
            const response = await fetch('http://localhost:5000/api/admin/trainer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : localStorage.getItem('token')
                },
                body: JSON.stringify(trainerData)
            });

            if (!response.ok) {
                alert(response.msg)
                throw new Error(`Error: ${response.status}`);
            }

            const newTrainer = await response.json();
            console.log('New trainer added:', newTrainer);
            alert('trainer Added')
            window.location.href = "../TrainerList/index.html"
        } catch (error) {
            console.error('Error adding trainer:', error);
        }
    });
});
