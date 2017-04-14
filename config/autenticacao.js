const Strategy = require('passport-local');


module.exports = function(passport) {
    passport.use(new Strategy(
        function(username, password, done) {
            // database dummy - find user and verify password
            if (username === 'nind' && password === 'roadsec') {
                // to req.user
                return done(null, {
                    id: 1,
                    firstname: 'nind',
                    lastname: 'fametro',
                    email: 'nindfametro@gmail.ll',
                    verified: true
                });
            } else {
                return done(null, false);
            }
        }
    ));
}
