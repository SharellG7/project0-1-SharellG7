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