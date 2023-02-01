import express, { Request, Response } from 'express';
import morgan from 'morgan';

import connect from './utils/connect';

const app = express();

require('dotenv').config();

const BASE_API = process.env.BASE_API;
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan('tiny'));

app.get(`${BASE_API}/products`, (req: Request, res: Response) => {
    const product = req.body;
    res.send(product);
})

app.listen(port, async () => {
    console.log(`server is running on http://localhost:${port}`)
    await connect();
})
