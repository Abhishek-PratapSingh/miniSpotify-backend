const express = require('express');
const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router();

router.post('/register' , async(req, res) => {
    const {email, password} = req.body;
    try{
       const user = new User({email, password});
       await user.save();
       res.status(201).send('User registered');
    }
    catch(error){
        res.status(400).send(error.message);  
    }
})

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try{
       const user = await User.findOne({email})
       if(!user || !await user.comparePassword(password)){
        res.status(401).send('Invalid credentials')
       }
       const token = jwt.sign({userId: user._id}, JWT_SECRET)
       res.json({token});
    }
    catch(error){
       res.status(400).send(error.message);
    }
})

module.exports = router