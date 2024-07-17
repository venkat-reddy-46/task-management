import express from 'express';

import {createTask,getTasks,editTask,deleteTask} from '../controllers/taskController.js';
import fetchUser from '../middleware/fetchUser.js';

const router = express.Router();

router.get(
    '/tasks',
    fetchUser,
    getTasks
);

router.post(
    '/tasks',
    fetchUser,
    createTask
);

router.put(
    '/tasks/:id',
    fetchUser,
    editTask
);

router.delete(
    '/tasks/:id',
    fetchUser,
    deleteTask
);

export default router;