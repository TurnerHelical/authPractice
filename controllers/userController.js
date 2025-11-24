const db = require('../db/query.js');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

async function logInPageGet(req, res) {
    res.render('logIn', {
        title: 'Login Page',
        stylesheet: '/styles/logIn.css'
    });
};

async function logInPagePost(req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/user/dash',
        failureRedirect: '/user/logIn'
    })(req, res, next);

};

async function logOutGet(req, res, next) {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/')
    });
};

async function signUpPageGet(req, res) {
    res.render('signUp', {
        title: 'Sign Up Page',
        stylesheet: '/styles/signUp.css',
    });
};

async function signUpPagePost(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('signUp', {
            title: "Sign Up Page",
            stylesheet: "/styles/signUp.css",
            errors: errors.array(),
            data: req.body
        });
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            first_name: req.body.fname,
            last_name: req.body.lname
        }
        const newUser = await db.newUserInsert(user);
        req.logIn(newUser, (err) => {
            if (err) return next(err);
            return res.redirect('/user/dash')
        });
        
    } catch (err) {
        if (err.code === '23505') {
            return res.render('signUp', {
                title: "Sign Up Page",
                stylesheet: "/styles/signUp.css",
                errors: [{ msg: "Email or username already in use" }],
                data: req.body
            });
        }
        next(err);
    }
};

async function dashPageGet(req, res) {
    res.render('dash', {
        title: 'User Dashboard',
        stylesheet: '/styles/dash.css',
    })
};

module.exports = {logInPageGet, logInPagePost,logOutGet, signUpPageGet, signUpPagePost, dashPageGet};