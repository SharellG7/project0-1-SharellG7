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
        successfulSubmit.innerText = 'Successfully updated!';
        successfulSubmit.style.color = 'green';

    } catch (err) {
        console.log(err);
        console.log('failed to submit');
        const errElement = document.getElementById('status-submit');
        errElement.innerText = 'Unsuccessfull update, please try again later.';
        errElement.style.color = 'red';
    };
};