import express from 'express';
import * as reimbursementDao from '../daos/reimbursement.dao';
import { authMiddleware } from '../middleware/auth.middleware';


// the user router represents a subset of the application
// for all enpoints starting with /users
export const reimbursementRouter = express.Router();



/**
 * /reim
 * find reimbursement by status
 */
reimbursementRouter.get('/status/:statusId', [
    authMiddleware('Dean', 'ADP'),
    async (req, res) => {
    const users = await reimbursementDao.findByStatusId(+req.params.statusId);
    res.json(users);
}]);

/**
 * /reim/
 * find reimbursement by greek member
 */
reimbursementRouter.get('/author/userId/:userId', [
    authMiddleware('Dean', 'ADP'),
    async (req, res) => {
    const users = await reimbursementDao.findByUserId(+req.params.userId);
    res.json(users);
}]);

/**
 * /reim
 * create new member resource w/ proper permissions
 */
reimbursementRouter.post('', [
    authMiddleware('Dean'),
    (req, res) => {
    const user = req.body;
    reimbursementDao.save(user);
    res.status(201); // created status code
    res.json(user);
}]);

/**
 * /reim
 * partially update member resource
 */
reimbursementRouter.patch('', [
    authMiddleware('Dean', 'ADP'),
    (req, res) => {
    reimbursementDao.patch(req.body);
    res.end();
}]);

/// UNUSED AUTHMIDDLEWARE FOR GET REIM BY ID
// reimbursementRouter.get('/author/userId/:userId', [
//     authMiddleware('Dean', 'ADP', 'Neo', 'Prophtye', 'Interest'), // anyone should be allowed
//     async (req, res) => {
//     const users = await reimbursementDao.findByUserId(+req.params.userId);
//     console.log(req.session.user);
//     if (!users) {
//         res.status(400);
//     } else { // here wwe check if they are athorized
//         if (users[0].author.userId == req.session.user.userId || req.session.user.roleId === '1' 
//            || req.session.user.roleId === '2') {
//             res.json(users);
//            }
//         else {
//             res.status(403);
//         }
//     }
// }]);