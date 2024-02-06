document.addEventListener('DOMContentLoaded', () => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    async function fetchmembers() {

        try {
            const url = new URL('http://localhost:5000/api/member/member?id=' + id);

            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const members = await response.json();
            const member = members[0]
            document.getElementById('firstName').value = member.firstName;
            document.getElementById('lastName').value = member.lastName;
            document.getElementById('phone').value = member.phoneNumber;
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    }

    fetchmembers()

    const addmemberForm = document.getElementById('editMemberForm');


    addmemberForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const phoneNumber = document.getElementById('phone').value;

        const memberData = {
            firstName,
            lastName,
            phoneNumber
        };

        try {
            const response = await fetch('http://localhost:5000/api/admin/member/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization' : localStorage.getItem('token')
                },
                body: JSON.stringify(memberData)
            });

            if (!response.ok) throw new Error(`Error: ${response.status}`);

            const newmember = await response.json();
            console.log('member edited:', newmember);
            alert('member edited')
            window.location.href = "../MemberList/index.html"
        } catch (error) {
            console.error('Error adding member:', error);
        }
    });
});
