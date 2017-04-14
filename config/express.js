var express = require('express');
var path = require('path');
var load = require('express-load');
var bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

module.exports = function() {

    //configuração de ambiente


    app.set('port', (process.env.PORT || 5000));

    //middleware
    app.use(express.static('./public'));
    //app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(require('method-override')());
    app.use(morgan())

    load('models', { cwd: 'app' })
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
};
