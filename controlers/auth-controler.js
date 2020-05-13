const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

exports.register = async (req, res) => {

    const candidate = await User.findOne({login: req.body.login});

    if (candidate) {
        // Error user already exist
        console.log('User already exist...');
        res.status(409).send({message: 'User already exist...'});
    } else {
        // Create new user
        const salt = await bcrypt.genSalt(10);
        const password = await req.body.password
        const user = new User ({
            login: req.body.login,
            password: bcrypt.hashSync(password, salt)
        });
        
        try {
            await user.save();
            console.log('User created...');
            res.status(201).send(user);
        } catch {
            console.log('Error while created new user');
        }
    }

};

exports.login = async (req, res) => {
    
    const candidate = await User.findOne({login: req.body.login});

    if (candidate) {
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        
        if (passwordResult) {
            // generate token
            const token = jwt.sign({
                login: candidate.login,
                userId: candidate.id
            }, keys.jwt, {expiresIn: 60 * 60 });
            res.status(200).json({token: `Bearer ${token}`, expiresIn: 60 * 10}); // 60 * 60 in s
        } else {
            res.status(403).json({message: 'Incorect password'})
        }

    } else {
        // No such user
        res.status(404).json({message: 'No such user'})
    }

};