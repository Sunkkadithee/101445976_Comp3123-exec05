const express = require('express');
const fs = require('fs'); // To read user.json
const errorHandlerMiddleware = require('./Express.js');
const app = express();
const router = express.Router();


// Middleware to parse JSON body
app.use(express.json());


//Return home.html page to client
router.get('/home', (req, res) => {
  res.sendFile(__dirname + '/home.html'); 
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req, res) => {
  fs.readFile('user.json', (err, data) => {
    if (err) {
      return res.status(500).send('Server Error');
    }
    res.json(JSON.parse(data));
  });
});

/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and password is valid then send response as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If password is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile('user.json', (err, data) => {
    if (err) {
      return res.status(500).send('Server Error');
    }
    
    const user = JSON.parse(data);
    
    if (username !== user.username) {
      return res.json({
        status: false,
        message: "User Name is invalid"
      });
    }
    
    if (password !== user.password) {
      return res.json({
        status: false,
        message: "Password is invalid"
      });
    }
    
    res.json({
      status: true,
      message: "User Is valid"
    });
  });
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req, res) => {
  const username = req.params.username;
  res.send(`<b>${username} successfully logged out.</b>`);
});

/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
app.get('/error', (req, res) => {
  throw new Error('This is a forved error')
  res.status(500).send('Server Error');
});


app.use('/', router);
app.use(errorHandlerMiddleware);

app.listen(process.env.PORT || 8081, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 8081));
});
