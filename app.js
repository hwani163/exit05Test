var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


//var routes = require('./routes/index.js');
var users = require('./routes/user/users.js');
var auth = require('./routes/auth/auth.js');
var memo = require('./routes/memo/memo.js');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

//app.use('/', routes);
app.use('/users', users);
app.use('/memo',memo);
app.use('/auth',auth);

// 에러 핸들러 400에러
//app.use(function(req, res, next) {
//  var err = new Error('Not Found');
//  err.status = 404;
//  next(err);
//});
//
////에러 핸들러 500에러
//app.use(function(err, req, res, next) {
//  res.status(err.status || 500);
//  res.send('error');
//
//});



//공통 Requeest :::::::::::::
app.get('/index', function(req, res) {
  res.writeHead(302, {
    'Location' : 'index.html'
  });
  res.end();
});

app.post('/main', function(req, res) {
  res.writeHead(302, {
    'Location' : 'main/main.html'
  });
  res.end();
});

//::::auth Request::::

//로그인시 인증 처리
app.post('/auth.do', auth.auth);

//memo 불러오기
//app.post('getListMemo.do',memo.list);




module.exports = app;
