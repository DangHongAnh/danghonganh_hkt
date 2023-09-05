const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');


const app = express();

const userRouter = require('./routers/user.router');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"))

app.use('/api/v1/users', userRouter)

app.listen(3015, (err, res) => {
    console.log("http://localhost:3015");
})