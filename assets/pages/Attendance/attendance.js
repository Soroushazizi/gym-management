let params = new URLSearchParams(window.location.search);
let id = params.get('id');


async function attend(value) {
    const data = {attended : value}
    const response = await fetch('http://localhost:5000/api/trainer/attendance/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('Done')
        window.location.href = "../MemberAttendance/index.html"
    } else if (response.status === 404) {
        alert('User not registered');
    } else {
        console.error(`Error: ${response.status}`);
    }
}