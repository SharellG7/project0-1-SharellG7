console.log('loading users information');

/***************************************
        SHOW CURRENT USER INFO
***************************************/
const fullUser = JSON.parse(localStorage.getItem('user'));
if (user) {
    const fullName = document.getElementById('fullName').innerText =
        (`${user.firstName} ${user.lastName}`);
    document.getElementById('username').innerText = (` ${user.username}`);
    document.getElementById('userId').innerText = (` ${user.userId}`);
    document.getElementById('email').innerText = (` ${user.email}`);
    // document.getElementById('password').innerText = user.password;
    document.getElementById('role').innerText = (` ${user.role.role}`);
};

const editUsername = document.getElementById('edit-username');
const editEmail = document.getElementById('edit-email');
editUsername.value = fullUser.username;
editEmail.value = fullUser.email;

/***************************************
            UPDATE PROFILE
 ***************************************/
async function safeUpdateProfile(event) {
    event.preventDefault();
    console.log('updating profile from form data');
    const password = document.getElementById('edit-password').value;
    const ConfirmPassword = document.getElementById('confirm-password').value;
    const updateProfileInfo = {
        ...user,
        username: editUsername.value,
        password,
        email: editEmail.value
    }

    validatePassword();
    try {
        console.log(user.userId);
        const res = await fetch(`http://localhost:8012/users`, {
            method: 'PATCH',
            updateProfileInfo: 'include',
            body: JSON.stringify(updateProfileInfo),
            headers: {
                'content-type': 'application/json'
            }
        });
        const successfulSubmit = document.getElementById('status-submit');
        successfulSubmit.innerText = 'Successfully updated!';
        successfulSubmit.style.color = 'green';

    } catch (err) {
        console.log(err);
        const errElement = document.getElementById('status-submit');
        errElement.innerText = 'Unsuccessfull update, please try again later.';
        errElement.style.color = 'red';

    }
    // safeAdd(user);
    // loadData();
}

/***************************************
            SHOW PASSWORD
 ***************************************/
function viewPassword(pass) {
    let passwordInput = document.getElementById('edit-password');
    let confirmPasswordInput = document.getElementById('confirm-password');
    let passStatus = document.getElementById('pass-status');
    let confirmStatus = document.getElementById('confirm-status');
    // console.log(passwordInput);
    // console.log(confirmPasswordInput);

    if (pass === 'p') {
        if (passwordInput.type == 'password') {
            passwordInput.type = 'text';
            passStatus.className = 'fa fa-eye-slash';
        }
        else {
            passwordInput.type = 'password';
            passStatus.className = 'fa fa-eye';
        }
    } else if (pass === 'c') {
        if (confirmPasswordInput.type == 'password') {
            confirmPasswordInput.type = 'text';
            confirmStatus.className = 'fa fa-eye-slash';
        }
        else {
            confirmPasswordInput.type = 'password';
            confirmStatus.className = 'fa fa-eye';
        }
    }
}

/***************************************
            VALIDATE PASSWORD
 ***************************************/
function validatePassword() {
    let password1 = document.getElementById('edit-password').value;
    let password2 = document.getElementById('confirm-password').value;

    // If password not entered 
    if (password1 == '') {
        alert("Please enter Password");
    } else if (password2 == '') {
        // If confirm password not entered 
        alert("Please enter Confirm password");
    } else if (password1 != password2) {
        // If Not same return False.
        alert("\nPasswords did not match: Please try again...")
        return false;
    } else {
        console.log('passwords match');
        return true;
    }
}

/***************************************
        SHOW USER REIMBURSEMENT
***************************************/
async function getUserReim() {

    const user = JSON.parse(localStorage.getItem('user'));
    const res = await fetch(`http://localhost:8012/reimbursement/author/userId/${user.userId}`, {
        credentials: 'include'
    });
    const reimbursement = await res.json();
    reimbursement.map(addReim);
}
getUserReim();

function addReim(reimbursement) {
    const tbody = document.getElementById('tbody');
    tr = document.createElement('tr');
    tbody.appendChild(tr);

    const reimbursementId = document.createElement('td');
    reimbursementId.innerText = reimbursement.reimbursementId;
    tr.appendChild(reimbursementId);

    const author = document.createElement('td');
    author.innerText = reimbursement.author.userId;
    tr.appendChild(author);

    const amount = document.createElement('td');
    amount.innerText = (`${reimbursement.amount} hrs`);
    tr.appendChild(amount);

    const dateSubmitted = document.createElement('td');
    dateSubmitted.innerText = reimbursement.dateSubmitted;
    tr.appendChild(dateSubmitted);

    const dateResolved = document.createElement('td');
    dateResolved.innerText = reimbursement.dateResolved;
    tr.appendChild(dateResolved);

    const description = document.createElement('td');
    description.innerText = reimbursement.description;
    tr.appendChild(description);

    const resolver = document.createElement('td');
    resolver.innerText = reimbursement.resolver.userId;
    tr.appendChild(resolver);

    const reimbursementStatus = document.createElement('td');
    reimbursementStatus.innerText = reimbursement.status.status
    tr.appendChild(reimbursementStatus);

    const reimbursementType = document.createElement('td');
    reimbursementType.innerText = reimbursement.type.type;
    tr.appendChild(reimbursementType);
};