document.addEventListener('DOMContentLoaded', () => {
    const addTrainerForm = document.getElementById('addMemberForm');

    addTrainerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const phoneNumber = document.getElementById('phone').value;
        const password = document.getElementById('password').value;

        const trainerData = {
            firstName,
            lastName,
            phoneNumber,
            role: 'member',
            password,
            username
        };

        try {
            const response = await fetch('http://localhost:5000/api/admin/member', {
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
            console.log('New Member added:', newTrainer);
            alert('Member Added')
            window.location.href = "../MemberList/index.html"
        } catch (error) {
            console.error('Error adding Member:', error);
        }
    });
});
