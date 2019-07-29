console.log('loading reimbursement information');

async function getAllMembers (e) {

    e.preventDefault();
    try {
        const res = await fetch(`http://localhost:8012/users`, {
            method: 'GET',
            credentials: "include",
        });

        const user = await res.json();
        const tbody = document.getElementById('tbody');
        tbody.innerHTML = '';
        user.forEach(addUser);

        localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
        console.log(err);
        const errElement = document.getElementById('error-message');
        errElement.innerText = 'Unauthorized to View User Information';
        errElement.style.color = 'red';
    };
};

function addUser (user) {
    const tbody = document.getElementById('tbody');
    tr = document.createElement('tr');
    tbody.appendChild(tr);

    const userId = document.createElement('td');
    userId.innerText = user.userId;
    tr.appendChild(userId);

    const username = document.createElement('td');
    username.innerText = user.username;
    tr.appendChild(username);

    const firstName = document.createElement('td');
    firstName.innerText = user.firstName;
    tr.appendChild(firstName);

    const lastName = document.createElement('td');
    lastName.innerText = user.lastName;
    tr.appendChild(lastName);

    const email = document.createElement('td');
    email.innerText = user.email;
    tr.appendChild(email);

    const role = document.createElement('td');
    role.innerText = user.role.role;
    tr.appendChild(role);
};