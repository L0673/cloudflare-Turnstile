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






const token = form.data['cf-turnstile-response']; // الحصول على التوكن من النموذج
const cfFormData = new FormData();

// إضافة المفاتيح إلى FormData
cfFormData.append('secret', '0x4AAAAAAAyPW0ZlI4Ltxv2qhTdXwdsm5uwy'); // استبدل 'your-secret-key' بمفتاحك السري الفعلي
cfFormData.append('response', token);

const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'; // رابط التحقق

// إرسال طلب التحقق إلى Cloudflare
const result = await fetch(url, {
  body: cfFormData,
  method: 'POST'
});

// الحصول على الاستجابة من Cloudflare
const outcome = await result.json();

// التحقق من نجاح أو فشل التوكن
if (!outcome.success) {
  throw new Error('Cloudflare JS was not completed correctly!'); // رمي خطأ في حال فشل التحقق
}





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


