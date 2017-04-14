require('getmodule');
var http = require('http');
var app = require('./config/express')();
var passport = require('passport');
const jwt = require('jsonwebtoken');
const passportStrategies = require('./config/autenticacao')
    //var mongoUriLocal = 'mongodb://127.0.0.1:27017/roadsec';
    //var mongo = require('./config/database.js')(mongoUriMlab);

function serialize(req, res, next) {
    next();
}

function generateToken(req, res, next) {
    req.token = jwt.sign({
        iss: req.user.id,
        name: req.username
    }, 'server secret', {
        expiresInMinutes: 120
    });
    next();
}

function respond(req, res, next) {

    return res.status(200).send({ success: true, token: req.token });
}

passportStrategies(passport);

app.use(passport.initialize());
app.post('/auth', passport.authenticate(
    'local', {
        session: false
    }), serialize, generateToken, respond);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express Server escutando na porta ' +
        app.get('port'));
});
