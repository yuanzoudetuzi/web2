let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let expressSession = require('express-session');
let redis = require('redis');
let redisStore = require('connect-redis')(expressSession);
let bodyParser = require('body-parser');

let login = require('./server/routes/login');
let index = require('./server/routes/index');
let users = require('./server/routes/users');
let gateway = require('./server/routes/gateway');
let node = require('./server/routes/node');
let command = require('./server/routes/command');

let app = express();
const ipAddress = redis.ipAddress, rds_port = redis.rds_port,auth_pass = redis.auth_pass

app.set('views', path.join(__dirname, 'views'));
/*app.set('view engine', 'jade');*/
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

let redisClient = redis.createClient(rds_port, ipAddress, {auth_pass: auth_pass});
// 设置Express的Session存储中间件
app.use(expressSession({
    store: new redisStore({client: redisClient}),      /*缓存存储数据库*/
    secret: 'password',
    resave: false,
    saveUninitialized: false,
    rolling: false,
    cookie: {maxAge: 1000*60*60*24}   /*设置缓存时间，非常重要！！！！设置过短导致缓存失效，请求错误*/
    // cookie: {maxAge: 1000*60}   /*设置缓存时间，非常重要！！！！设置过短导致缓存失效，请求错误*/

  }
));
// view engine setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'server/public')));

app.use('/', login);
/*app.use('/index', index);*/
app.use('/gateway', gateway);
app.use('/node', node);
app.use('/command', command);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
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
  // res.render('error');
});

let ip = require('ip');
let server = app.listen(80, "127.0.0.1", function () {
  console.log("服务器IP地址:" + ip.address());
  let host = server.address().address;
  let port = server.address().port;

  console.log("应用已启动，访问地址为 http://%s:%s", host, port)
});

module.exports = app;
