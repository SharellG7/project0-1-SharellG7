console.log('loading users information');

/***************************************
        SHOW CURRENT USER INFO
***************************************/
const userFullName = JSON.parse(localStorage.getItem('user'));
if (user) {
    const fullName = document.getElementById('userFullName').innerText = 
        (`${user.firstName} ${user.lastName}`);
    document.getElementById('username').innerText = (` ${user.username}`);
    document.getElementById('userId').innerText = (` ${user.userId}`);
    document.getElementById('email').innerText = (` ${user.email}`);
    // document.getElementById('password').innerText = user.password;
    document.getElementById('role').innerText = (` ${user.role.role}`);
};

/***************************************
            UPDATE PROFILE
***************************************/
let password = document.getElementById("edit-password")
  , confirmPassword = document.getElementById("confirm-password");

async function safeUpdateProfile(event) {
    event.preventDefault();
    console.log('updating profile from form data');
    const editUsername = document.getElementById('edit-username').value;
    const password = document.getElementById('edit-password').value;
    validatePassword();
    const editEmail = document.getElementById('edit-email').value;
    const updateProfileInfo = {
        editUsername,
        password,
        editEmail
    }
    try {
        const res = await fetch('http://localhost:8012/users', {
            method: 'PATCH',
            updateProfileInfo: 'include',
            body: JSON.stringfy(updateProfileInfo),
            headers: {
                'content-type': 'application/json'
            }
        });
    } catch (err) {
        console.log(err);
        const errElement = document.getElementById('successful');
        
    }
    safeAddCardRow(card); 
}

/***************************************
            SHOW PASSWORD
***************************************/
function viewPassword()
{
  var passwordInput = document.getElementById('edit-password');
  var passStatus = document.getElementById('pass-status');
 
  if (passwordInput.type == 'password'){
    passwordInput.type='text';
    passStatus.className='fa fa-eye-slash';
    
  }
  else{
    passwordInput.type='password';
    passStatus.className='fa fa-eye';
  }
}

/***************************************
            VALIDATE PASSWORD
***************************************/
function validatePassword() {
  if(password.value != confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords Don't Match");
  } else {
    confirmPassword.setCustomValidity('');
  }
}
password.onchange = validatePassword;
confirmPassword.onkeyup = validatePassword;

/***************************************
        SHOW UPDATED INFO
        do i need this?
***************************************/
async function loadData() {
    const resp = await fetch('http://localhost:8012/users', {
        credentials: 'include'
    });
    const cards = await resp.json();
    console.log(users);
    users.forEach(safeUpdateProfile);
};
// loadData();