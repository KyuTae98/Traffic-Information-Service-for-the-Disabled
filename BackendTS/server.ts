const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port:number = 3000;

const busRouter = require('./routes/busdata');
const subwayRouter = require('./routes/subwaydata');

let corsOptions = {
    origin: ['http://localhost:3000/#/', 'http://localhost:3000', 'http://localhost:3005', 'http://34.168.80.42:3000', 'http://172.30.1.35:5000', 'http://localhost:5000'],
    credentials: true
}

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, './Frontend/creative/build')))

app.use('/bus', busRouter);
app.use('/subway', subwayRouter);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './Frontend/creative/build/index.html'));
})

app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
})
