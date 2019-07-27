console.log('loading profile information');

async function getMemberById (e) {

    e.preventDefault();
    const id = document.getElementById('inputId').value;
    try {
        const res = await fetch(`http://localhost:8012/users/${id}`, {
            method: 'GET',
            credentials: "include",
        });
        
        const user = await res.json();
        addUser(user);
        
        localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
        console.log(err);
        // const errElement = document.getElementById('error-message');
        // errElement.innerText = 'Invalid Credentials';
    };
};

async function getAllMembers (e) {

    e.preventDefault();
    // const id = document.getElementById('inputId').value;
    try {
        const res = await fetch(`http://localhost:8012/users`, {
            method: 'GET',
            credentials: "include",
        });

        const user = await res.json();
        user.forEach(addUser);

        localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
        console.log(err);
    };
};

function addUser (user) {
    const tbody = document.getElementById('tbody');
    tr = document.createElement('tr');
    tbody.appendChild(tr);

    const userId = document.createElement('td');
    userId.innerText = user.userId;
    tr.appendChild(userId);
    
    console.log(tr);
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
}