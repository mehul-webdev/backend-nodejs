const express = require('express');
const errorHandler = require('./ErrorHandling');

const app = express();


const loggerMiddleWare = (req, res, next) => {
    console.log(`${new Date()} --- request [${req.method} ${req.url}]`);
    next();
}

const auth = (req, res, next) => {
    const params = req.query;
    if(params?.password === "123"){
        next();
    }else{
        // res.status(401).json({
        //     message: "please enter right password"
        // })
        const error = new Error("User is not valid");
        error.status = 401; // Attach status code to the error
        next(error); // Pass error to Express error handler
    }
};

app.use(express.static('public')); // Serve static files from the 'public' directory



// Application level middleware
app.use(loggerMiddleWare)

const port = 3001;


app.get("/", (req, res) => {
    res.send("App is running")
})

app.get("/1", auth, (req, res) => {
    res.send("App is running")
})

app.use(errorHandler)

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
})

