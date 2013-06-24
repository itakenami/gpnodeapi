
/**
 * Module dependencies.
 */

var express = require('express'),
    load = require('express-load'),
    http = require('http'),
    path = require('path'),
    genericmodel = require('genericmodel');

var pool = genericmodel.getPool({
    host     : 'localhost',
    user     : 'root',
    password : 'innetra',
    database : 'gp'
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.set('pool',pool);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

load('models')
    .then('controllers')
    .then('routes')
    .into(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
