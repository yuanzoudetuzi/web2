/**
 * Created by fanhualuomu on 17-6-1.
 */
let express = require('express');
let router = express.Router();
let url = require('url');
let util = require('util');
let path = require('path');
// const ipAddress = require('./redis_conf.js');
let async = require('async');
let Redis = require('ioredis');
let redis = require('redis');
const RedisConf = require("./redis_conf");
const rds_port = RedisConf.rds_port;
const rds_host = RedisConf.ipAddress;
const rds_opts = {
    auth_pass:RedisConf.auth_pass
};

let autoZeros = function (str) {
  if (str < 10 && str >= 0) {
    return '0' + str.toString()
  }
  else if (str >= 10) {
    return str.toString()
  }
  else {
    return '**'
  }
};

/*gateway/id/:id*/
/*Get gateway item*/
router.get('/id/:id', function (req, response, next) {
  let gatewayId = req.params.id;
  let gateway = {gatewayId: gatewayId, maxOpacity: parseInt(1000 * Math.random())};
  response.send(gateway);
});

/*gateway/all*/
/*Get gateway List*/
router.get('/all', function (req, response, next) {
  if(!req.session.user)  {
    console.log("gateway/all is no user in req.session");
    return response.json({"err":"no user in req.session"});
  }

  let client = redis.createClient(rds_port, rds_host, rds_opts);
  client.on('connect', function () {
    client.smembers('User:' + req.session.user.username + ':GatewayList', function (err, res) {
      let gatewayList = [];
      let gateway = {};
      for (let i = 0; i < res.length; i++) {
        gateway["gatewayId"] = res[i];
        gatewayList.push(gateway);
        gateway = {};
      }
      return response.json({"data":gatewayList});
    });
  });
});

let globalInfoList_USERREALTIME = [];
let globalResponse_USERREALTIME;
/*gateway/:gatewayid/userrealtimeinfo/:number*/
router.get('/:gatewayid/userrealtimeinfo/:number', function (req, respond, next) {
  console.log('user real info');
  globalResponse_USERREALTIME = respond;
  // let redis = require('redis'), rds_port = 6379, rds_host = ipAddress, rds_opts = {auth_pass: 'loraweb115'};
  let client = redis.createClient(rds_port, rds_host, rds_opts);
  console.log(' req.params.gatewayid = ' +  req.params.gatewayid);
  client.on('connect', function () {
    client.smembers('Gateway:' + req.params.gatewayid + ":NodeList", function (err, nodeListRes) {
      globalInfoList_USERREALTIME = [];
      if(err) {
        console.log(err);
        return globalResponse_USERREALTIME.json({'err':'读取数据库失败'});
      }
      if(!nodeListRes) {
        console.log("无节点列表");
        return globalResponse_USERREALTIME.json({'err':'无节点列表'});
      }
      let isReturn = false;
      for (let index = 0; index < nodeListRes.length; index++) {
        // console.log('user info nodeListRes');
        // console.log(nodeListRes);
        client.smembers('Node:' + nodeListRes[index] + ':UserInfo:TimeSet', function (err, timeRes) {
          if(err) {
            console.log(err);
            return globalResponse_USERREALTIME.json({'err':'读取数据库失败'});
          }
          // console.log('user info timeRes');
          // console.log(timeRes);
          if(!timeRes) {
            console.log("无时间列表");
            return globalResponse_USERREALTIME.json({'err':'无时间列表'});
          }
          // globalInfoList_USERREALTIME = [];
          for(let count=0; count<50&&count<timeRes.length;count++) {
            timeRes = timeRes.sort().reverse();
            client.hgetall('Node:' + nodeListRes[index] + ':UserInfoByTime:'+timeRes[count], function (error, infoRes) {
                // console.log('userrealtimeinfo Node:' + nodeListRes[index] + ':UserInfoByTime:'+timeRes[count]);
                // console.log("count =" +count);
                if(err) {
                  console.log(err);
                  return globalResponse_USERREALTIME.json({'err':'读取数据库失败'});
                }
                if(infoRes) {
                  // console.log("infoRes");
                  // console.log(infoRes);
                  let info = {};
                  info['nodeId'] = nodeListRes[index];
                  info['time'] = timeRes[count];
                  info['water'] = infoRes['water'];
                  info['power'] = infoRes['power'];
                  info['longitude'] = infoRes['longitude'];
                  info['latitude'] = infoRes['latitude'];
                  globalInfoList_USERREALTIME.push(info);
                  // console.log("globalInfoList_USERREALTIME");
                  // console.log(globalInfoList_USERREALTIME.length);
                } else {
                  console.log("节点无具体用户信息信息");
                }
                if (!isReturn) {
                  if(globalInfoList_USERREALTIME.length>=50||globalInfoList_USERREALTIME.length>=nodeListRes.length*5) {
                    console.log('user real info:');
                    console.log(globalInfoList_USERREALTIME.length);
                    isReturn = true;
                    return globalResponse_USERREALTIME.json({'data':globalInfoList_USERREALTIME});
                  }
                }
              }
            );
          }
        })
      }

    });
  });
});

/*gateway/:gatewayid/userhistoryinfo/start/:start/end/:end*/
router.get("/:gatewayid/userhistoryinfo/start/:start/end/:end", function (req, res, next) {
  let infoList = [];
  let info = {};
  for (let i = 0; i < 50; i++) {
    info['nodeId'] = parseInt(10000 * Math.random());
    info['time'] = '2017-04-08 ' + autoZeros(parseInt(24 * Math.random())) + ':' + autoZeros(parseInt(60 * Math.random())) + ':' + autoZeros(parseInt(60 * Math.random()));
    info['water'] = parseInt(1000 * Math.random());
    info['power'] = parseInt(1000 * Math.random());
    info['longitude'] = parseInt(360 * Math.random());
    info['latitude'] = parseInt(360 * Math.random());
    infoList.push(info);
    info = {};
  }
  res.send(infoList);
});


let globalInfoList_SYSTEMREALTIME = [];
let globalResponse_SYSTEMREALTIME;
/*gateway/:gatewayid/systemrealtimeinfo/:number*/
router.get("/:gatewayid/systemrealtimeinfo/:number", function (req, res, next) {
  console.log('system real info');
  globalResponse_SYSTEMREALTIME = res;
  // let redis = require('redis'), rds_port = 6379, rds_host = ipAddress, rds_opts = {auth_pass: 'loraweb115'};
  let client = redis.createClient(rds_port, rds_host, rds_opts);
  client.on('connect', function () {
    client.smembers('Gateway:' + req.params.gatewayid + ":NodeList", function (err, nodeListRes) {
      globalInfoList_SYSTEMREALTIME = [];
      if(err) {
        console.log(err);
        return globalResponse_SYSTEMREALTIME.json({'err':'读取数据库失败'});
      }
      if(!nodeListRes) {
        console.log("无节点列表");
        return globalResponse_SYSTEMREALTIME.json({'err':'无节点列表'});
      }
      let isReturn = false;
      for (let index = 0; index < nodeListRes.length; index++) {
        client.smembers('Node:' + nodeListRes[index] + ':SysInfo:TimeSet', function (err, timeRes) {
            if(err) {
              return globalResponse_SYSTEMREALTIME.json({'err':'读取数据库失败'});
            }
            if(!timeRes) {
              return globalResponse_SYSTEMREALTIME.json({'err':'无时间列表'});
            }
            // globalInfoList_SYSTEMREALTIME = [];
            for(let count=0;count < 50 && count < timeRes.length;count++){
              timeRes = timeRes.sort().reverse();
              client.hgetall('Node:' + nodeListRes[index] + ':SysInfoByTime:'+timeRes[count], function (error, infoRes) {
                // console.log('systemrealtimeinfo Node:' + nodeListRes[index] + ':UserInfoByTime:'+timeRes[count]);
                // console.log("count =" +count);
                  if(err) {
                    console.log(err);
                    return globalResponse_SYSTEMREALTIME.json({'err':'读取数据库失败'});
                  }
                  if(infoRes) {
                    let info = {};
                    info['nodeId'] = nodeListRes[index];
                    info['time'] = timeRes[count];
                    info['chan'] = infoRes['channel'];
                    info['freq'] = infoRes['freq'];
                    info['modu'] = infoRes['modulation'];
                    info['rssi'] = infoRes['rssi'];
                    globalInfoList_SYSTEMREALTIME.push(info);
                  } else {
                    console.log("节点无具体系统信息信息");
                  }
                  if (!isReturn) {
                    if(globalInfoList_SYSTEMREALTIME.length>=50||globalInfoList_SYSTEMREALTIME.length>=nodeListRes.length*5) {
                      isReturn = true;
                      return globalResponse_SYSTEMREALTIME.json({'data':globalInfoList_SYSTEMREALTIME});
                    }
                  }
            });
          }
        })
      }

    });
  });
});

/*gateway/:gatewayid/systemhistoryinfo/start/:start/end/:end*/
router.get("/:gatewayid/systemhistoryinfo/start/:start/end/:end", function (req, res, next) {
  let infoList = [];
  let info = {};
  for (let i = 0; i < 50; i++) {
    info['nodeId'] = parseInt(10000 * Math.random());
    info['time'] = '2017-04-08 ' + autoZeros(parseInt(24 * Math.random())) + ':' + autoZeros(parseInt(60 * Math.random())) + ':' + autoZeros(parseInt(60 * Math.random()));
    info['freq'] = parseInt(1000 * Math.random());
    info['channel'] = parseInt(1000 * Math.random());
    info['upLink'] = parseInt(360 * Math.random());
    info['downLink'] = parseInt(360 * Math.random());
    infoList.push(info);
    info = {};
  }
  res.send(infoList);
});


/*获取具体网关地理位置信息*/
router.get('/map/:gatewayid', function (req, response, next) {
  console.log("map");

  // let redis = require('redis'), rds_port = 6379, rds_host = ipAddress, rds_opts = {auth_pass: 'loraweb115'};
  let client = redis.createClient(rds_port, rds_host, rds_opts);
  let gatewayId =  req.params.gatewayid;
  console.log("gatewayId = "+gatewayId);
  client.on('connect', function () {
    client.hgetall('Gateway:' + gatewayId, function (err, gatewayRes) {
      if(err) {
        console.log(err);
        return response.json({"err":"get gateway information from redis err"})
      }
      if(gatewayRes) {
        let info = {};
        // console.log('gateway info');
        // console.log(gatewayRes);
        info["gatewayId"] = gatewayId;
        info["longitude"] = gatewayRes["longitude"];
        info["latitude"] = gatewayRes["latitude"];
        return response.json({"data":[info]});
      }  else {
        return response.json({'err':"数据库中无网关信息"});
      }

    });
  });
});


/*获取用户的所有网关地理位置信息*/
router.get('/mapall', function (req, response, next) {
  console.log("all map");
  if(!req.session.user)  {
      console.log("/mapall is no user in req.session");
      return response.json({"err":"no user in req.session"})
  }
  // let redis = require('redis'), rds_port = 6379, rds_host = ipAddress, rds_opts = {auth_pass: 'loraweb115'};
  let client = redis.createClient(rds_port, rds_host, rds_opts);
  client.on('connect', function () {
     client.smembers("User:" + req.session.user.username + ":GatewayList",function (err,gatewayList) {
         if(err) {
           console.log(err);
           return response.json({"err":"get all gateways from redis is wrong"});
         }
         if(gatewayList){
             let resGatewayList = [];
             for(let i=0;i<gatewayList.length;i++) {
               client.hgetall("Gateway:"+gatewayList[i],function (err,gateway) {
                 if(err) {
                   console.log(err);
                   return response.json({"err":"get gateway from redis is wrong"});
                 }
                   let info = {};
                   info["gatewayId"] = gatewayList[i];
                   info["longitude"] = gateway["longitude"];
                   info["latitude"] = gateway["latitude"];
                   resGatewayList.push(info);
                  if(resGatewayList.length>=gatewayList.length) {
                    return response.json({"data":resGatewayList});
                  }
               });
             }
         }else {
           console.log("用户下无网关");
           return response.json({"err":"用户下无网关"});
         }
     });
  });
});

module.exports = router;
