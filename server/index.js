const express = require("express")
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({path: './.env'});

const app = express();

const PORT = 3002;

app.use(express.json());
app.use(cors());

// Test connection 
app.get("/", (req,res) => {
    res.send("<h1>Hello there :)<h1>")
});


/*
// Create connection 
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,

});
*/
const db = mysql.createConnection(process.env.DATABASE_URL);

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

// Gets all the employees records, will be used for manager table
app.get("/api/employee/manager/*", (req,res) => {
    const valuesArray = req.originalUrl.split("/");
    const userIdVal = valuesArray[4];

    const sqlInsert = `SELECT * FROM employee_time where userID!=${userIdVal};`
    db.query(sqlInsert, (err,result) => {
        if(err) throw err
        res.send(result)
    })
});

// Gets all the employees records, will be used for manager table
app.get("/api/employee/manager", (req,res) => {
    const sqlInsert = `SELECT * FROM employee_time;`
    db.query(sqlInsert, (err,result) => {
        if(err) throw err
        res.send(result)
    })
});

// Updates the status of employee record (manager view)
app.get("/api/employee/status/update/*/*", (req,res) => {
    const valuesArray = req.originalUrl.split("/");
    
    const statusVal = valuesArray[5];
    const uniqueIdVal = valuesArray[6];

    const sqlUpdate = `UPDATE employee_time SET status='${statusVal}' WHERE uniqueID=${uniqueIdVal};`
    db.query(sqlUpdate, (err,result) => {
        if(err) throw err
        res.send(result)
    })

});

//Modify record (manager view)
app.get("/api/employee/status/Modified/*/*/*/*", (req,res) => {
    const valuesArray = req.originalUrl.split("/");
    const uniqueIdVal = valuesArray[5];
    const startTimeVal = valuesArray[6];
    const endTimeVal = valuesArray[7];
    const shiftTypeVal = valuesArray[8];

    var finalStartDateTime = new Date(startTimeVal)
    finalStartDateTime = finalStartDateTime - (finalStartDateTime.getTimezoneOffset() * 60000);
    var finalStartDateTime = new Date(finalStartDateTime).toISOString().replace('T', ' ').replace('Z', '');

    var finalEndDateTime = new Date(endTimeVal)
    finalEndDateTime = finalEndDateTime - (finalEndDateTime.getTimezoneOffset() * 60000);
    var finalEndDateTime = new Date(finalEndDateTime).toISOString().replace('T', ' ').replace('Z', '');

    
    const sqlUpdate = `UPDATE employee_time SET type='${shiftTypeVal}',startTime='${finalStartDateTime}', endTime='${finalEndDateTime}',status='Modified' WHERE uniqueID=${uniqueIdVal};`
//, startTime='${startTimeVal}', endTime='${endTimeVal}', type='${shiftTypeVal}' 
    db.query(sqlUpdate, (err,result) => {
        if(err) throw err
        res.send(result)
    })

});


// When start shift or break pressed, creates a record
app.get("/api/startShiftBreak/*/*/*", (req,res) => {
    const valuesArray = req.originalUrl.split("/");

    const userIdVal = valuesArray[3];
    const usernameVal = valuesArray[4];
    const shiftTypeVal = valuesArray[5];

    var startDateTime = new Date();
    startDateTime = startDateTime - (startDateTime.getTimezoneOffset() * 60000);
    var finalStartDateTime = new Date(startDateTime).toISOString().replace('T', ' ').replace('Z', '');

    const sqlInsert = `INSERT INTO employee_time (userID, username, type, startTime, endTime, time, status) VALUES (${userIdVal}, '${usernameVal}', '${shiftTypeVal}','${finalStartDateTime}', null, 0, "Pending");`
    db.query(sqlInsert, (err,result) => {
        console.log(err)
        res.send(result)
    })
});


// When start shift or break pressed, updates record and ends shift
app.get("/api/endShiftBreak/*", (req,res) => {
    const valuesArray = req.originalUrl.split("/");
    const userIdVal = valuesArray[3];

    var endDateTime = new Date();
    endDateTime = endDateTime - (endDateTime.getTimezoneOffset() * 60000);
    finalEndDateTime = new Date(endDateTime).toISOString().replace('T', ' ').replace('Z', '');

        const sqlUpdate = `UPDATE employee_time SET endTime='${finalEndDateTime}' WHERE userID=${userIdVal} and endTime IS NULL;`

        db.query(sqlUpdate, (err,result) => {
            if(err) throw err
            console.log(result)
            res.send(result)
        })
    });




// Gets a specific employees records for employee dashboard
app.get("/api/employeeSpecific/*", (req,res) => {
    const valuesArray = req.originalUrl.split("/");
    const userId = valuesArray[3];
     const sqlInsert = `SELECT * FROM employee_time WHERE userID=${userId};`
    // const sqlInsert = `DELETE FROM employee_time WHERE userID=${userId} AND startTime IS NOT NULL AND endTime IS NULL;`
    // const sqlInsert = `DELETE FROM employee_time WHERE username='Joe';`
    // const sqlInsert = `DELETE FROM employee_time WHERE userID=${userId};`


    db.query(sqlInsert, (err,result) => {
        res.send(result)
    })
});

// For time punches, checks data to see which buttons to disable
app.get("/api/endTimeNull/*", (req,res) => {
    const valuesArray = req.originalUrl.split("/");
    const userId = valuesArray[3];

    const sqlInsert = `SELECT * FROM employee_time WHERE userID=${userId} AND startTime IS NOT NULL AND endTime IS NULL;`
    db.query(sqlInsert, (err,result) => {
        res.send(result)
    })
});

app.get('/api/register/*/*/*/*', (req, res)=> {
    const valuesArray = req.originalUrl.split("/");
    const username = valuesArray[3];
    const password = valuesArray[4];
    const name = valuesArray[5];
    const userType = valuesArray[6];
    const sqlInsert = `INSERT INTO user (username, password,name, usertype) VALUES (${username}, '${password}', '${name}', '${userType}')`

    db.query(sqlInsert, (err, result) => {
        if (err) throw err    
        res.send(result)        
    }); 
});

app.get('/api/users', (req, res)=> {
    db.query("SELECT * FROM user;", (err, result) => {
        if (err) throw err    
        res.send(result) 
    }); 
});

app.get('/api/login/*/*', (req, res)=> {
    const valuesArray = req.originalUrl.split("/");
    const username = valuesArray[3];
    const password = valuesArray[4];

    db.query(`SELECT * FROM user WHERE username=${username} AND password='${password}';`, (err, result) => {
        if (err) throw err    
        res.send(result) 
    }); 
});


//const sqlInsert = `DELETE FROM employee_time WHERE userID=${userId} AND startTime IS NOT NULL AND endTime IS NULL;`


app.listen(process.env.PORT || PORT);