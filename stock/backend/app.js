require("dotenv").config();
const express = require('express');
const router = require("./routes/user");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connection = require("./db");

//mongodb connection
connection();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(cookieParser());

// mongoose.connect("mongodb+srv://admin:2zM5Uup5gMDZboRt@cluster1.4f6gqqu.mongodb.net/auth?retryWrites=true&w=majority&appName=cluster1")
// .then(()=>{
//     app.listen(5000);
//     console.log("Database connected on localhost 5000");
// }).catch((err)=>{
//     console.log(err);
// });

//port listening
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});