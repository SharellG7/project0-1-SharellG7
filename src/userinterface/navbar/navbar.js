const nav = document.getElementById('app-nav');
nav.classList = 'navbar navbar-expand-md';
nav.innerHTML = `
<span class="navbar-brand" href="#">&Phi;P&Psi;</span>
<div class="collapse navbar-collapse" id="navbarsExample04">
    <ul class="navbar-nav mr-auto">
        <li class="nav-item ">
            <a class="nav-link" href="../userinterface/home.html">Home<span class="sr-only">(current)</span></a>
        <li class="nav-item ">
            <a class="nav-link" id="button" onclick="usersAccess()" href="#">View Members
            <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" 
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Reimbursement
        </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="nav-link" onclick="reimAccess()" href="#">View Reimbursements</a>
                <a class="nav-link" href="submit-reimbursement.html">Submit Reimbursements</a>
            </div>
        </li>
    </ul>
    <a class="userbtn" href="../userinterface/profile.html" id="nav-username">
    </a>
    <div id="nav-username" class="my-2 my-md-0"></div>
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="btn" href="../userinterface/login.html" role="button">Sign out<span
                    class="sr-only">(current)</span></a>
        </li>
    </ul>
</div>
`;

// displays current user on nav bar 
const user = JSON.parse(localStorage.getItem('user'));
if (user) {
    document.getElementById('nav-username').innerText = user.username;
};

