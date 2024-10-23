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
  turnstile.render('#myWidget', {
    sitekey: "0x4AAAAAAAyPW0WrShoxyuG6",
    callback: function (token) {
      console.log(`Challenge Success ${token}`);
      setTimeout(() => {
        document.querySelector(".btn-group").style.display="flex";
        document.getElementById("myWidget").style.display="none";
      }, 2000);
    },
  });
});