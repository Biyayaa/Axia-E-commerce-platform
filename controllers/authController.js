const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res)=>{
    try{
        const{username, email, password} = req.body;
        const user = await User.create({username, email, password});
        res.status(201).json({message: 'user registered'});
    } catch (error){
        res.status(400).json({error: error.message})
    }
};

exports.login = async (req, res)=>{
    try{
        const{email, username, password} = req.body;
        const user = await User.findOne({
            $or:[{email: email || ''}, {username: username || ''},],
        });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({error: 'Invalid credentials'});
        }
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
    }catch (error) {
        res.status(500).json({error: error.message});
    }

};