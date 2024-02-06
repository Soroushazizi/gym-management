const showHiddenPass = (loginPass, loginEye) => {
    const input = document.getElementById(loginPass),
        iconEye = document.getElementById(loginEye)

    iconEye.addEventListener('click', () => {
        if (input.type === 'password') {
            input.type = 'text'

            iconEye.classList.add('ri-eye-line')
            iconEye.classList.remove('ri-eye-off-line')
        } else {
            input.type = 'password'
            iconEye.classList.remove('ri-eye-line')
            iconEye.classList.add('ri-eye-off-line')
        }
    })
}

showHiddenPass('login-pass', 'login-eye')

document.querySelector('.login__form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-pass').value;

    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', 'Bearer ' + data.token)
        localStorage.setItem('role' , data.role)
        if(data.role === 'admin') {
            window.location.href = "../AdminPanel/index.html"
        }else if (data.role === 'trainer'){
            window.location.href = "../TrainerPanel/index.html"
        }else if (data.role === 'member'){
            window.location.href = "../MemberPanel/index.html"
        }
    } else if (response.status === 404) {
        alert('User not registered');
    } else {
        console.error(`Error: ${response.status}`);
    }
});