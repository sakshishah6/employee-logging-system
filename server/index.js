const express = require("express")
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({path: './.env'});


const app = express();

app.use(express.json());
app.use(cors());
// Test connection 
app.get("/", (req,res) => {
    res.send("<h1>Hello there :)<h1>")
});

// Create connection 
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,

});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

app.post('/register', (req, res)=> {

    const username = req.body.username;
    const password = req.body.password;
    db.query(
        "INSERT INTO users (username, password) VALUES (?,?)", 
        [username, password], 
        (err, res) => {
        console.log(err) 
        }
        ); 
});


app.listen(3001, () => {
    console.log("running on port 3001")
});