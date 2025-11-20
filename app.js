const express = require('express');

const app = express();

const path = require('path');

const session = require('express-session');

const passport = require('passport')

const configurePassport = require('./config/passport');
const indexRouter = require('./routes/index.js');

app.set('views', path.join(__dirname,'views'));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));

app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

app.use((req, res) => {
    res.locals.currentUser = req.user;
    next();
});

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    if (error) {
        throw error
    }

    console.log(`App running on ${PORT}.`);
});