//console.log('reached login function');

async function login(event) {
    event.preventDefault();
    console.log('attempting to login');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const credentials = {
        username,
        password
    }
    try {
        const res = await fetch('http://localhost:8012/login', {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(credentials),
            headers: {
                'content-type': 'application/json'
            }
        });

        const user = await res.json();
        //console.log(user);

        localStorage.setItem('user', JSON.stringify(user));
        window.location = './home.html'; // navigate pages
    } catch (err) {
        console.log(err);
        console.log('invalid credentials');
        const errElement = document.getElementById('error-message');
        errElement.innerText = 'Invalid Credentials';
        errElement.style.color = 'red';
    };
};

function viewPassword(pass) {
    let passwordInput = document.getElementById('edit-password');
    let passStatus = document.getElementById('pass-status');

    if (passwordInput.type == 'password') {
        passwordInput.type = 'text';
        passStatus.className = 'fa fa-eye-slash';
    }
    else {
        passwordInput.type = 'password';
        passStatus.className = 'fa fa-eye';
    }
}