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
    author.innerText = reimbursement.author.username;
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
    dateResolved.innerText = reimbursement.dateResolved;
    tr.appendChild(dateResolved);

    const description = document.createElement('td');
    description.innerText = reimbursement.description;
    tr.appendChild(description);

    const resolver = document.createElement('td');
    resolver.innerText = reimbursement.resolver.username;
    tr.appendChild(resolver);

    const reimbursementStatus = document.createElement('td');
    reimbursementStatus.innerText = reimbursement.status.status
    tr.appendChild(reimbursementStatus);

    const reimbursementType = document.createElement('td');
    reimbursementType.innerText = reimbursement.type.type;
    tr.appendChild(reimbursementType);

    let editBtn = document.createElement("BUTTON");
    const pencil = `<a class="button button-small edit" title="Edit">
        <i class="fas fa-pencil-alt"></i></a>`;
    editBtn.innerHTML = pencil;
    tr.appendChild(editBtn);

};

