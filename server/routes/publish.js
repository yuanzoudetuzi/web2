var  ipAddress = require('./redis_conf');
var redis = require('redis');
const RedisConf = require("./redis_conf");
const rds_port = RedisConf.rds_port;
const rds_host = RedisConf.ipAddress;
const rds_opts = {
  auth_pass:RedisConf.auth_pass
};
var client = redis.createClient(rds_port, rds_host, rds_opts);
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  return fmt;
}


client.on('ready', function (res) {
  console.log('ready');
});

client.on('connect', function () {
  var date = Date.parse('2017/5/10 8:00:00');
  var time;
  var userInfo,sysInfo;
  var temperature, rssi, size, lsnr;
  console.log(date + 20 * 1000);
  for (var i = 0; i < 100; i++) {
    date += 20 * 1000;
    time = new Date(date).Format('yyyy-MM-dd hh:mm:ss');
    temperature =  (18 + Math.random()).toFixed(4);
    rssi = parseInt(-52 + 5 * Math.random());
    size = parseInt(5 * Math.random() + 18);
    lsnr = parseInt(5 * Math.random() + 9);
  /*  client.sadd('Node:cb:67:74:01:SysInfo:TimeSet', time);
    client.sadd('Node:cb:67:74:01:UserInfo:TimeSet', time);*/
    userInfo = "{\"lati\":30.74,\"long\":103.93,\"alti\":516,\"temperature\":" +
     temperature + ",\"gatewayID\":\"AA555A0000000001\"}";
    client.hmset('Node:cb:67:74:01:UserInfoByTime', time, userInfo, function (err, res) {});
    sysInfo =  "{\"tmst\":\"1.3974404E7\",\"freq\":\"868\",\"chan\":\"1\",\"rfch\":\"1\"," +
      "\"stat\":\"1\",\"modu\":\"LORA\",\"datr_lora\":\"SF12BW125\",\"codr\":\"4/5\",\"rssi\":\"" +
      rssi + "\",\"lsnr\":\"" + lsnr + "\",\"size\":\"" + size + "\"}"
    client.hmset('Node:cb:67:74:01:SysInfoByTime', time, sysInfo, function (err, res) {});
    console.log(time);
  }
  /*var globalNodeListRes_SYSTEMREALTIME;
  var globalCount_SYSTEMREALTIME = 0;
  var globalIndex_SYSTEMREALTIME;
  var globalTimeRes_SYSTEMREALTIME;
  var globalInfoList_SYSTEMREALTIME = [];
  var globalResponse_SYSTEMREALTIME;
  client.smembers('Node:' + 'cb:67:74:01' + ':SysInfo:TimeSet', function (err, timeRes) {
    var count = 0;
    while (count < 50 && count < timeRes.length) {
      timeRes = timeRes.sort().reverse()
      globalTimeRes_SYSTEMREALTIME = timeRes;
      client.hmget('Node:' + 'cb:67:74:01' + ':SysInfoByTime', timeRes[globalCount_SYSTEMREALTIME++], function (error, infoRes) {
        console.log('globalCount_SYSTEMREALTIME ' + globalCount_SYSTEMREALTIME);
        console.log('timeRes[count] = ' + timeRes[count])
        console.log('count = ' + count)
        var resultData = JSON.parse(infoRes)
        var info = {};
        info['chan'] = resultData['chan'];
        info['freq'] = resultData['freq'];
        info['modu'] = resultData['modu'];
        info['rssi'] = resultData['rssi'];
        globalInfoList_SYSTEMREALTIME.push(info);
      });
      count++;
    }
  });*/
});
