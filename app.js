var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var index = require('./routes/index');
var user_cc = require('./routes/user_cc');
var cinema = require('./routes/cinema');
var cinemaMatch = require('./routes/cinemaMatch');
var message = require('./routes/message');
var movie = require('./routes/movie');
var hotShow = require('./routes/hotShow');
var hotMovie = require('./routes/hotMovie');
var reflect = require('./routes/reflect');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
  secret: 'fff', //一个String类型的字符串，作为服务器端生成session的签名
  resave: true,   //是否允许session重新设置，要保证session有操作的时候必须设置这个属性为true
  cookie: { maxAge: 60000 * 1000 }, //设置maxAge是Nms，即Nms后session和相应的cookie失效过期
  saveUninitialized: true //初始化session时是否保存到存储。默认为true， 但是(后续版本)有可能默认失效，所以最好手动添加。
}));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/user_cc', user_cc);
app.use('/cinema', cinema);
app.use('/cinemaMatch', cinemaMatch);
app.use('/message', message);
app.use('/movie', movie);
app.use('/hotShow', hotShow);
app.use('/hotMovie', hotMovie);
app.use('/reflect', reflect);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
