const express = require('express');
const connection = require('./app/config/database');
const router = require('./app/router');
const cors = require('cors');

connection();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.use(cors())

app.use('/',router);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
})