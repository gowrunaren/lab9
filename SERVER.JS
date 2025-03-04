const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json()); 



app.post('/login', (req, res) => {
    const user = {
        uname: "admin",
        age: 30
    };

    jwt.sign({ user }, "secret key",(err, token) => {
        if (err) {
            return res.status(500).json({ message: "Error generating token" });
        }
        res.status(200).json({ token });
    });
});

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    const barrer = token.split(' ')[1];
    req.token = barrer;
    if(barrer == null)
    {
        return res.status(403).json({ message: ' No token provided' });
    }
    else{
    jwt.verify(req.token, "secret key", (err,data) => {
        if (err) {
            return res.status(403).json({ message: ' Invalid token' });
        }
        else
        {
            console.log(data);
            req.authData = data;
        }
        next();});
    }
}


app.post('/verify', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Welcome', authData: req.authData });
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});
