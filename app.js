require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const { registrarControladores } = require('./controllers');
const { conectarMongoDb, subscribirCierres } = require('./db/db');

const app = express();
const port = process.env.PORT || 9000;

app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.json());

conectarMongoDb();

registrarControladores(app);

subscribirCierres();

app.listen(port, () => {
    console.log(`Backend corriendo en puerto: ${port}`);
});
