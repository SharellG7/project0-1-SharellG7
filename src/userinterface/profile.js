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
        const userInfo = document.getElementById('userInfo');
        console.log(user);
        console.log(userInfo);
        userId.innerText = user.userId;
        username.innerText = user.username;
        firstname.innerText = user.firstName;
        lastname.innerText = user.lastName;
        email.innerText = user.email;
        role.innerText = user.role.role_type;

        localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
        console.log(err);
        // const errElement = document.getElementById('error-message');
        // errElement.innerText = 'Invalid Credentials';
    };
};

async function getAllMembers (e) {

    // e.preventDefault();
    // const id = document.getElementById('inputId').value;
    try {
        const res = await fetch(`http://localhost:8012/users`, {
            method: 'GET',
            credentials: "include",
        });

        const user = await res.json();
        const userInfo = document.getElementById('userInfo');
        console.log(user);
        console.log(userInfo);
        for (i=0; i < user.length; i++) {
            userId.innerText = user.userId;
            username.innerText = user.username;
            firstname.innerText = user.firstName;
            lastname.innerText = user.lastName;
            email.innerText = user.email;
            role.innerText = user.role.role_type;
        }

        localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
        console.log(err);
        // const errElement = document.getElementById('error-message');
        // errElement.innerText = 'Invalid Credentials';
    };
};