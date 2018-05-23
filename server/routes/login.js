/**
 * Created by fanhualuomu on 17-5-9.
 */
let express = require('express');
let router = express.Router();
let path = require('path');
let redis = require('redis');
const RedisConf = require("./redis_conf");
const rds_port = RedisConf.rds_port;
const rds_host = RedisConf.ipAddress;
const rds_opts = {
  auth_pass:RedisConf.auth_pass
};

let jumpToUserPage = function (req,res) {
  if (req.session.user.type === 'ADMIN') {
   /* res.redirect(303, '/ordinary');*/
    res.sendFile(path.resolve('views/index.html'));
  } else {
    res.sendFile(path.resolve('views/ordinary_user.html'));
    /*res.redirect(303, '/index');*/
  }
}
/* GET home page. */
router.get('/', function (req, res, next) {
  /* res.render("login1",{message:'User register'});*/
  if (req.session.user) {
    jumpToUserPage(req, res);
  } else {
    res.sendFile(path.resolve('views/login1.html'));
  }
});

router.get('/login_in', function (req, res, next) {
  /* var url = req.query.username;
   console.log('url = ' + url);*/
  console.log('user = ' + req.session.user);
  if (req.session.user) {
    jumpToUserPage(req, res);
  } else {
    res.redirect(303, '/');
  }
});

router.get('/login_out', function (req, res, next) {
  req.session.user = null;
  res.redirect(303, '/');
});

/*router.get('/index', function (req, res) {
  console.log('redirect index');
  res.sendFile(path.resolve('views/index.html'));
});*/

/*
router.get('/ordinary', function (req, res) {
  console.log('redirect index');
  res.sendFile(path.resolve('views/ordinary_user.html'));
});
*/

router.post('/login', function (request, response, next) {
  console.log("*******************************login***************************");
  let client = redis.createClient(rds_port, rds_host, rds_opts);

  let username = request.body.username;
  let password = request.body.password;

  client.on('connect', function () {
    client.hgetall('User:' + username, function (err, res) {
      console.log('req.body.password' + password);
      if (err) {
        console.log('Err' + err);
        return response.end(err);
        }
        console.dir(res);
        if (res === null) {
          response.end('No User!');
        } else if (password === res.Password) {
          console.log('password same');
          if (res.UserType === 'ADMIN') {
            request.session.user = {'username': username, 'type': res.UserType};
          } else {
            // request.session.user = {'username': username, 'type': res.type, 'nodes': res.nodes};
          request.session.user = {'username': username, 'type': res.UserType};
        }
        response.end('login_in')
      } else {
        response.end('Password Wrong!');
      }

    });
  });
  client.on("error", function (err) {
    console.error("Redis connect error: " + err);
    response.end('redis 链接失败');
  });


  // 把获取到的用户信息通过JSON格式写到页面上
  //response.end(JSON.stringify(response));
  /* response.sendFile(path.resolve('views/index.html'));*/
});

module.exports = router;
