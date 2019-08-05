function reimAccess () {
	const user = JSON.parse(localStorage.getItem('user'));
	if (user.role.role !== 'Dean' && user.role.role !== 'ADP') {
		console.log(user);
		alert('You are not authorized to access this page!');
	}
	else {
		window.location = '../userinterface/view-reimbursements.html'; // navigate pages
	}
}
