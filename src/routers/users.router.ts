import express from 'express';
import * as userDao from '../daos/users.dao';
import { authMiddleware } from '../middleware/auth.middleware';

// the user router represents a subset of the application
// for all enpoints starting with /users
export const usersRouter = express.Router();

/**
 * /users
 * find all greek members
 */
usersRouter.get('', [
    authMiddleware('Dean', 'ADP'),
    async (req, res) => {
    const users = await userDao.findAll();
    res.json(users);
}]);

/**
 * /users
 * find all greek members by id
 */
usersRouter.get('/:userId', [
    authMiddleware('Dean', 'ADP'),
    async (req, res) => {
    const users = await userDao.findById(+req.params.userId);
    res.json(users);
}]);

/**
 * /users
 * create member resource
 */
usersRouter.post('',
    async (req, res) => {
        const user = req.body;
        if (!user) {
            res.sendStatus(400);
        } else {
            const newUser = await userDao.create(user);
            res.status(201);
            res.json(newUser);
}});

/**
 * /users
 * partially update member resource
 */
usersRouter.patch('',
    async (req, res) => {
    const userId = req.body.userId;
    const currentLoggedInUser = req.session.user.userId;
    console.log(userId)
    if (currentLoggedInUser === userId) {
        const updatedUser = await userDao.update(req.body);
        res.json(updatedUser);
    } else {
        res.sendStatus(403);
    }
});