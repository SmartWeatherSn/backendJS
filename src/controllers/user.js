const User =  require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User(
                {
                    userName: req.body.userName,
                    email: req.body.email,
                    password: hash,
                    telephone: req.body.telephone
                }
                );
            user.save()
                .then(() => res.status(201).json({message: 'User created !'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.loginByEmail = (req, res, next) => {
    User.findOne({userName: req.body.userName})
        .then(user => {
            if(!user) {
                return res.status(401).json({error: 'User not found'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({error: 'Bad password'});
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '365d'}
                        ),
                        user: user
                    });
                })
                .catch(error =>res.status(500).json({error}));
        })
        .catch(error =>res.status(500).json({error}))
};