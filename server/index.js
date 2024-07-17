import express from 'express';
import cors from 'cors';

import authRoute from './routes/auth.js';
import taskRoute from './routes/task.js';

const app = express();  //create an express app
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/user', taskRoute);

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
})