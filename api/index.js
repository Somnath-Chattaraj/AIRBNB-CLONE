const express = require('express')
const app = express();
const mongoose = require("mongoose");
const cors = require('cors')
require('dotenv').config();
const bcrypt = require('bcryptjs')
const User = require('./models/User');
const jwt = require('jsonwebtoken');

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'Iloveanganamukherjeehopessheslovesmetoo'

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
// console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL)
app.get('/test', function(req, res) {
    res.send('test ok')
});

app.post('/register', async function(req, res) {
    const {name, email, password} = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        })
        res.json(userDoc);
    } catch (error) {
        res.status(422).json(error);
    }
    
})

app.post('/login', async function(req, res) {
    const {email, password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
        const passok = bcrypt.compareSync(password, userDoc.password)
        if (passok) {
            jwt.sign({email:userDoc.email, id:userDoc._id}, jwtSecret, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(userDoc)
            })
            
        } else {
            res.status(422).json('pass not ok')
        }
        res.json('found');
    } else {
        res.json('not found');
    }
})


app.listen(3001, () => {
    console.log("Server running successfully on port 3001")
});