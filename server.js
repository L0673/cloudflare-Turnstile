const express = require("express");
const app = express();
const fetch = require('node-fetch'); // Make sure to install node-fetch: npm install node-fetch
const port = 3000;
const database = require("./database/database.js"); 

app.use(express.static('public'));

// Handle login route with Turnstile validation
app.get('/login', async (req, res) => {
    const { username, password, 'cf-turnstile-response': turnstileToken } = req.query;

    if (!turnstileToken) {
        return res.status(400).send('Turnstile token missing');
    }

    // Verify the Turnstile token with Cloudflare
    const secretKey = '0x4AAAAAAAyPW0ZlI4Ltxv2qhTdXwdsm5uw'; // Replace with your actual secret key
    const verificationUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', turnstileToken);

    const verifyResponse = await fetch(verificationUrl, {
        method: 'POST',
        body: formData
    });

    const verifyResult = await verifyResponse.json();

    if (!verifyResult.success) {
        return res.status(401).redirect('/?error=true');
    }

    // Validate username and password with your database
    const user = { username, password };
    database.authenticate(user)
    .then((result) => {
        if (result.length > 0) {
            res.json(result);  // Successful login
        } else {
            res.status(401).redirect('/?error=true');  // Authentication failed
        }
    })
    .catch(err => res.status(500).send('Server error'));
});

// Signup route
app.get('/submitSignup', (req, res) => {
    const { username, password } = req.query;
    const user = { username, password };

    database.signup(user)
    .then((result) => {
        if (result) {
            res.json("User created! Please login.");
        } else {
            res.redirect('/signup?error=true');
        }
    })
    .catch(err => res.status(500).send('Server error'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
