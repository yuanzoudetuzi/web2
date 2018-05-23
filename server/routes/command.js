/*
 /!*
 var express = require('express');
 var router = express.Router();
 var url = require('url');
 var util = require('util');
 var  ipAddress = require('./ipaddress');
 /!*POST command*!/
 router.post('/sendCommand', function (req, res, next) {
 /!* console.log('command ' + JSON.stringify(req.body));*!/
 console.log('Received command ');
 var command = req.body['nodeId'].concat(req.body['commandType']);
 console.log('command ' + command);
 var redis = require('redis'), rds_host = ipAddress, rds_port = 6379, rds_opts = {auth_pass: 'loraweb115'};
 var client = redis.createClient(rds_port, rds_host, rds_opts);
 client.on('ready', function (res) {
 console.log('ready');
 });

 client.on('connect', function () {
 client.sadd('command', command);
 client.smembers('command', function (err, res) {
 if (err) {
 console.log('Err: ' + err);
 return;
 }
 console.dir(res);
 client.quit();
 });
 });
 res.send('hello');

 });

 /!*
 var server = app.listen(80, "0.0.0.0", function () {
 /!*
 console.log("服务器IP地址:" + ip.address());
 *!/
 var host = server.address().address;
 var port = server.address().port;

 console.log("应用已启动，访问地址为 http://%s:%s", host, port)
 });*!/

 module.exports = router;
 *!/

 // 订阅接口
 // channel 需要订阅的channel
 // callback 处理订阅的消息的回调函数，可以为async function
 exports.subscribe = async function(channel, callback) {
 // 读取redis配置信息
 var redisConfig = config.get("redis");
 var options = {
 host: redisConfig.host,
 port: redisConfig.port,
 user: redisConfig.user,
 password: redisConfig.password,
 db: redisConfig.database
 };
 // 创建redis client
 var subClient = redis.createClient(options);
 // 添加订阅监听处理函数
 subClient.on("message", async function(channel, message) {
 logger.info(format.vsprintf("Received subscribe message, channel [%s] message [%s]", [channel, message]));
 // 调用回调函数
 await callback(channel, message);
 });
 // 开始订阅
 subClient.subscribe("channel_update_permissions");
 // 订阅成功
 subClient.on("ready", function() {
 logger.info(format.vsprintf('Redis [%s:%s/%s] is connected and ready for subscribe channel [%s] use.', [redisConfig.host, redisConfig.port, redisConfig.database, channel]));
 });
 // 错误处理
 redisClient.on("error", function (err) {
 logger.error("Subscribe channel ["+channel+"] encountered error. Error:" + err);
 });
 // 将client加到全局map中，以备后用
 subscribeClients.set(channel, subClient);
 };
 // 调用publish功能。使用普通redis client即可
 exports.publish = async function(channel, message) {
 await redisClient.publish(channel, message);
 };
 */

/**
 * Created by fanhualuomu on 17-5-23.
 */
let express = require('express');
let router = express.Router();
let url = require('url');
let util = require('util');
let redis = require('redis');
const RedisConf = require("./redis_conf");
const rds_port = RedisConf.rds_port;
const rds_host = RedisConf.ipAddress;
const rds_opts = {
  auth_pass:RedisConf.auth_pass
};
let ipAddress = require('./redis_conf');
/*POST command*/
router.post('/sendCommand', function (req, res, next) {
  /* console.log('command ' + JSON.stringify(req.body));*/
  console.log('Received command ');
  console.log(req.body);
  // let command = req.body['nodeId'].concat(":",req.body['commandType']);
  let command = req.body;

  // 创建redis client
  let publisher = redis.createClient(rds_port, rds_host, rds_opts);

  publisher.publish('CommandChannel', JSON.stringify(command));

  let subscriber = redis.createClient(rds_port, rds_host, rds_opts);
  subscriber.on('message', function (channel, message) {
    console.log('The ack is ' );
    console.log(message);
    let msg = JSON.parse(message);
    console.log('send msg = ');
    console.log(msg);
    return res.json({"data":msg});
  });
  subscriber.subscribe('ACKChannel');
  subscriber.on('ready', function () {
    console.log('Redis is connected and ready for subscribe channel use.');
  });
  // 错误处理
  subscriber.on('error', function (err) {
    console.log('Subscribe channel  encountered error. Error:' + err);
    return  res.json({"err":"AckChannel is err"});
  });
  /*res.send('hello');*/
});
module.exports = router;

