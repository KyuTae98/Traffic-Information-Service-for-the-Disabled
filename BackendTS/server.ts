import express, { Request, Response } from 'express'
const app = express();
const port:number = 3005;
import path from 'path';
import cors from 'cors';
import mysql from 'mysql';
import fs from 'fs';
import https from 'https';

import * as db from './db';
db.connect();

import busRouter from './routes/busdata';
import subwayRouter from './routes/subwaydata';
import navigationRouter from './routes/navigation';

const httpsOptions = {
    key: fs.readFileSync('./KEY/rootca.key'),
    cert: fs.readFileSync('./KEY/rootca.crt')
};

let corsOptions: cors.CorsOptions = {
    origin: ['http://localhost:3000/#/', 'http://localhost:3000', 'http://localhost:3005', 'http://34.168.80.42:3000', 'http://172.30.1.35:5000', 'http://localhost:5000', 'http://localhost:80', 'http://localhost:80/#/', 'https://www.easy-taza.site', 'https://.easy-taza.site'],
    credentials: true
}

app.use(cors(corsOptions));

//app.use(express.static(path.join(__dirname, '../../Backend/Frontend/creative/build')))

app.use('/bus', busRouter);
app.use('/subway', subwayRouter);
app.use('/navigation',navigationRouter);

app.get('/', (req:Request, res:Response) => {
    res.json({
        success: true,
    });
});

const HTTPS_PORT = 3005;


https.createServer(httpsOptions, app).listen(HTTPS_PORT, ()=>{
    console.log(`server is listening at localhost:${HTTPS_PORT}`);
});


/*
app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
})
*/


//10분 주기로 MySQL Connection 유지용 쿼리 보내기
const mysql_Connect_Maintenance = setInterval(() => {
    const connection:mysql.connection = db.return_connection();
    connection.query("SELECT 1");
}, 360000); //10분
