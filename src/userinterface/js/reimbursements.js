console.log('loading reimbursement information');

// async function getAllReimbursements (e) {

//     e.preventDefault();
//     try {
//         const res = await fetch(`http://localhost:8012/reimbursements`, {
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

async function getReimByUserId (e) {

    e.preventDefault();
    const id = document.getElementById('userId').value;
    try {
        const res = await fetch(`http://localhost:8012/reimbursement/author/userId/${id}`, {
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
        // console.log(statusId);
        const res = await fetch(`http://localhost:8012/reimbursement/status/${statusId}`, {
            method: 'GET',
            credentials: "include",
        });

        // console.log(res);
        const reimbursement = await res.json();
        const tbody = document.getElementById('tbody');
        tbody.innerHTML = '';
        addActionHeader();
        reimbursement.forEach(addReim);

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
    let formatDate = reimbursement.dateSubmitted && new Date(reimbursement.dateSubmitted).toDateString();
    dateSubmitted.innerText = formatDate;
    tr.appendChild(dateSubmitted);
    
    const dateResolved = document.createElement('td');
    formatDate = reimbursement.dateResolved && new Date(reimbursement.dateSubmitted).toDateString();
    dateResolved.innerText = formatDate;
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

    if (reimbursementStatus.innerText === 'Pending') {
        const approveBtn = document.createElement('button');
        approveBtn.classList = `btn-success `;
        approveBtn.innerText = `Approve`;
        approveBtn.setAttribute= ('onclick', "setAction('approve');"); 
        tr.appendChild(approveBtn);

        const denyBtn = document.createElement('button');
        denyBtn.classList = `btn-danger`;
        denyBtn.innerText = `Deny`;
        // approveBtn.setAttribute.onclick = setAction('deny');
        tr.appendChild(denyBtn); 

    } else if (reimbursementStatus.innerText === 'Approved' ||
        reimbursementStatus.innerText === 'Denied') {
            const voidText = document.createElement('td');
            voidText.innerText = 'No Action Required';
            voidText.style.color = 'green';
            tr.appendChild(voidText);
        }
};

function addActionHeader () {
    // checks if header as been added already
    if (document.getElementById('set')) {
        return;
    }

    const trow = document.getElementById('trow');
    th = document.createElement('th');
    trow.appendChild(th);
    th.id = 'set';
    
    const addTableHeader = document.createElement('th');
    addTableHeader.innerHTML = 'Actions';
    th.appendChild(addTableHeader);
};

function setAction (action) {
    console.log(`setting action: ${action}`);


}