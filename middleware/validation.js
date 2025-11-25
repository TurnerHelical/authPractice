const {body} = require('express-validator');
const pool = require('../db/pool');

const allowedCodes = ['SecretSetupCode', 'SecretAdminSetupCode']

const validateSignUp = [
    
    body('fname').trim()
        .optional({checkFalsy: true})
        .matches(/^[a-zA-Z'-]+$/).withMessage('Must contain only letters, hyphens, or apostrophes').bail()
        .isLength({max:30}).withMessage('Must be less than 30 characters'),
    body('lname').trim()
        .optional({checkFalsy: true})
        .matches(/^[a-zA-Z'-]+$/).withMessage('Must contain only letters, hyphens, or apostrophes').bail()
        .isLength({max:30}).withMessage('Must be less than 30 characters'),
    body('email').trim()
        .notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('Must be a valid email').bail()
        .isLength({max: 254}).withMessage('Email must be less than 255 characters').bail()
        .custom(async (value) => {
            const {rows} = await pool.query('SELECT 1 FROM users WHERE email = $1',[value]);
            if (rows.length > 0) {
                throw new Error("Email is already registered");
            }
            return true
        }),
    body('username').trim()
        .notEmpty().withMessage('Username is required').bail()
        .isAlphanumeric().withMessage('Username must be only letters and numbers').bail()
        .isLength({min:5, max:25}).withMessage('Username must be between 5 and 25 characters').bail()
        .custom(async (value) => {
            const {rows} = await pool.query('SELECT 1 FROM users WHERE username = $1',[value]);
            if (rows.length > 0) {
                throw new Error("Username is already used");
            }
            return true
        }),
    body('password').trim()
        .notEmpty().withMessage('Password is required').bail()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        }).withMessage('Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character'),
    body('confirmPassword').trim()
        .notEmpty().withMessage('Must confirm password').bail()
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true
        }),
    body('signupCode').custom((value => {
        if (!allowedCodes.includes(value)) {
            throw new Error("Invalid Signup code");
        }
        return true
    }))

];

const validateLogin = [
    body('username').trim()
        .notEmpty().withMessage('Username is required').bail()
        .isLength({min:3, max: 25}).withMessage('Username must be between 3 and 25 characters'),
    body('password').trim()
        .notEmpty().withMessage('Password is required')
]

module.exports = {validateSignUp, validateLogin};