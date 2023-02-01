import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import connect from './utils/connect';
import router from './router';

const app = express();

require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(router);

app.listen(port, async () => {
    console.log(`server is running on http://localhost:${port}`)
    await connect();
})
