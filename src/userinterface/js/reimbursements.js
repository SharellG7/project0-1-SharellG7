console.log('loading reimbursement information');

// async function getAllReimbursements (e) {

//     e.preventDefault();
//     try {
//         const res = await fetch(`http://localhost:8012/reimbursements/status/1`, {
//             method: 'GET',
//             credentials: "include",
//         });

//         const reimbursement = await res.json();
//         const tbody = document.getElementById('tbody');
//         tbody.innerHTML = '';
//         reimbursement.forEach(addReim);

//     } catch (err) {
//         console.log(err);
//         // const errElement = document.getElementById('error-message');
//         // errElement.innerText = 'Unauthorized to View User Information';
//         // errElement.style.color = 'red';
//     };
// };

function assignPendingStatus() {
    getReimByStatus('1');
};

function assignApprovedStatus() {
    getReimByStatus('2');
};

function assignDeniedStatus() {
    getReimByStatus('3');
};

async function getReimByStatus (statusId) {

    try {
        const res = await fetch(`http://localhost:8012/reimbursement/status/${statusId}`, {
            method: 'GET',
            credentials: "include",
        });

        const reimbursement = await res.json();
        const tbody = document.getElementById('tbody');
        tbody.innerHTML = '';
        reimbursement.forEach(addReim);

    } catch (err) {
        console.log(err);
        // const errElement = document.getElementById('error-message');
        // errElement.innerText = 'Unauthorized to View User Information';
        // errElement.style.color = 'red';
    };
};

async function getReimByUserId () {

    e.preventDefault();
    const id = document.getElementById('userId').value;
    try {
        const res = await fetch(`http://localhost:8012/reimbursement/author/userId/${id}`, {
            method: 'GET',
            credentials: "include",
        });
        
        const user = await res.json();
        const tbody = document.getElementById('tbody');
        addUser(user);
        
    } catch (err) {
        console.log(err);
        // const errElement = document.getElementById('error-message');
        // errElement.innerText = 'Unauthorized to View User Information';
        // errElement.style.color = 'red';
    };
};

function addReim (reimbursement) {
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