var jwt = require('jwt-simple');
var segredo = 'server secret';

module.exports = function(req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    //1
    if (token) {
        try {
            var decoded = jwt.decode(token, segredo);
            console.log('decodando ' + decoded);
            //2
            if(decoded.iss === 666 && decoded.name === 'devilsname'){
                console.log('achei usuario ' + req.user)
                return next();
            }
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Erro: Seu token é inválido' });
        }
    } else {
        res.json(401, { message: 'Token não encontrado ou informado' })
    }
};
