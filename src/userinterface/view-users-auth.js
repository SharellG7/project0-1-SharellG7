console.log('reached check access page');

function checkAccess () {
	if (user.role.role !== 'Dean' || user.role.role !== 'ADP') {
		alert('You are not authorized to access this page!');
	}
}

checkAccess();
