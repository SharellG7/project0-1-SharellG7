async function createNewUser(event) {
    event.preventDefault();
    console.log('attempting to submit');

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const newUser = {
        username,
        password,
        firstName,
        lastName,
        email,
        role: {
            roleId: 5
        }
    }

    console.log(newUser);
    try {
        const res = await fetch('http://localhost:8012/users', {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(newUser),
            headers: {
                'content-type': 'application/json'
            }
        });

        const reimbursement = await res.json();
        console.log(newUser);

        // const successfulSubmit = document.getElementById('status-submit');
        // successfulSubmit.innerText = 'Welcome to Psi Purple Phi!';
        // successfulSubmit.style.color = 'green';
        window.location = './login.html'; // navigate pages

    } catch (err) {
        console.log(err);
        console.log('failed to submit');
        const errElement = document.getElementById('status-submit');
        errElement.innerText = 'Unsuccessfull update, please try again later.';
        errElement.style.color = 'red';
    };
};

function usernameValidation () {
    
}