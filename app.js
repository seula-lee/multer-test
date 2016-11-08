var express = require('express');
var path    = require('path');
var favicon = require('serve-favicon');
var logger  = require('morgan');              // morgan: 클라이언트의 HTTP 요청 정보를 로깅하기 위한 모듈
var cookieParser = require('cookie-parser');  // cookie-parser: 접속한 클라이언트의 쿠키 정보에 접근하기 위한 모듈
var bodyParser   = require('body-parser');    // body-parser: 클라이언트의 HTTP 요청 중 POST 요청의 바디 데이터에 접근하기 위한 모듈
var multer = require('multer');

// getting routes module
var index   = require('./routes/index');
var users   = require('./routes/users');
var uploads  = require('./routes/uploads');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // express.static(): 정적 파일 호스팅을 위한 경로 설정

// setting routes module url
// app.use('/', routes): 라우팅 설정. 세부 라우팅은 /routes 폴더에 구현됨
app.use('/', index);
app.use('/users', users);
app.use('/uploads', uploads);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
