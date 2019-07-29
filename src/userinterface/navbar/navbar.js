const nav = document.getElementById('app-nav');
nav.classList = 'navbar navbar-expand-md navbar-light';
nav.innerHTML = `
<a class="navbar-brand" href="#">&Phi;P&Psi;</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04"
    aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
</button>

<div class="collapse navbar-collapse" id="navbarsExample04">
    <ul class="navbar-nav mr-auto">
        <li class="nav-item ">
            <a class="nav-link active" href="../userinterface/home.html">Home<span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item ">
            <a class="nav-link" href="../userinterface/view-users.html">View Users<span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item ">
            <a class="nav-link" id="button" href="../userinterface/view-users-auth.js">Test Auth Users
            <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" 
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Reimbursement
        </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="view-reimbursements.html">View Reimbursements</a>
                <a class="dropdown-item" href="#">Submit Reimbursements</a>
                <a class="dropdown-item" href="#">Edit Reimbursements</a>
            </div>
        </li>
    </ul>
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" href="../userinterface/profile.html">Member Profile<span
                    class="sr-only">(current)</span></a>
        </li>
    </ul>
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

