// routes.ts
import express from 'express';
import {
    getUserById,
    getAll,
    createUser,
    updateUser,
    deleteUser

} from '../controllers/userController';

const router = express.Router();

router.get('/users/:id', getUserById);
router.post('/users', getAll);
router.post('/users/create', createUser);
router.put('/users/update', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
