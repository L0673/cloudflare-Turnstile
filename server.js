const express = require("express");
const app = express();
const port = 3000;

const database = require("./database/database.js"); 
app.use(express.static('public'));

app.get('/login', (req, res) => {

  // getting the username and password from the query string
  const { username, password } = req.query;
  const user = {
    username : username,
    password : password
  }
  // databe call to authenticate user
  database.authenticate(user)
  .then((result) => {
    console.log(result);
    if(result.length > 0){
      res.json(result);
    }
    else{
      res.status(401).redirect('/?error=true');
   
    }
  }
  )
});


app.get('/submitSignup', (req, res) => {

  // getting the username and password from the query string
  const { username, password } = req.query;
  const user = {
    username : username,
    password : password
  }
  // databe call to create user
  database.signup(user)
  .then((result) => {
    if(result){
      res.json("user created! please login");
    }
    else{
      res.redirect('/signup?error=true');
    }
  }
  )
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// if using synchronous loading, will be called once the DOM is ready
turnstile.ready(function () {
  turnstile.render("#myWidget", {
    sitekey: "0x4AAAAAAAyPW0WrShoxyuG",
    callback: function (token) {
      console.log(`Challenge Success ${token}`);
    },
  });
});



const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
    const turnstileToken = req.body['cf-turnstile-response'];
    const secretKey = '0x4AAAAAAAyPW0ZlI4Ltxv2qhTdXwdsm5uw';

    try {
        const response = await axios.post('https://challenges.cloudflare.com/turnstile/v0/siteverify', null, {
            params: {
                secret: secretKey,
                response: turnstileToken
            }
        });

        if (response.data.success) {
            // Token is valid, proceed with login
            const username = req.body.username;
            const password = req.body.password;
            // Your login logic here
            res.send('Login successful');
        } else {
            res.status(400).send('Turnstile verification failed');
        }
    } catch (error) {
        res.status(500).send('Error verifying Turnstile token');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});