console.log('reached submit page');

// Pre-fills Information
const fullUser = JSON.parse(localStorage.getItem('user'));
const reimAuthor = document.getElementById('author');
reimAuthor.value = fullUser.userId;

async function submitReimbursement(event) {
    event.preventDefault();
    console.log('attempting to submit');

    const reimType = document.getElementById('reimbursementType').value;
    const reimDescription = document.getElementById('description').value;
    const reimHours = document.getElementById('amount').value;
    const reimDateSubmitted = document.getElementById('dateSubmitted').value;
    const reimbursement = {
        type: {
            typeId: reimType
        },
        author: {
            userId: +reimAuthor.value
        },
        resolver: null,
        dateResolved: null,
        status: {
            statusId: 1
        }
    }
    const submitReimbursement = {
        ...reimbursement,
        amount: reimHours,
        dateSubmitted: reimDateSubmitted,
        description: reimDescription
    }
    console.log(submitReimbursement);
    try {
        const res = await fetch('http://localhost:8012/reimbursement', {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(submitReimbursement),
            headers: {
                'content-type': 'application/json'
            }
        });

        const reimbursement = await res.json();
        console.log(reimbursement);
        const successfulSubmit = document.getElementById('status-submit');
        successfulSubmit.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> You have submitted a new reimbursement. Click on
                your profile to view. 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`;

    } catch (err) {
        console.log(err);
        console.log('failed to submit');
        const errElement = document.getElementById('status-submit');
        errElement.innerText = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Uh oh!</strong> An error occurred. Please try again. 
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`;
    };
};