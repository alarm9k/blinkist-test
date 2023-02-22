import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import {api} from './api';

const app = express();

app.use([
    cors({origin: 'http://127.0.0.1:3002', credentials: true}),
    helmet(),
    cookieParser(),
    express.json()
]);

app.use(api);

app.listen(3001);