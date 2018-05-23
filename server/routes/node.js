/**
 * Created by fanhualuomu on 17-6-1.
 */
let express = require('express');
let router = express.Router();
let url = require('url');
let util = require('util');
// let ipAddress = require('./redis_conf.js');
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
/*node/water*/
/*Get water List of ordinary user*/
router.get('/water', function (req, res) {
  console.log(req.session.user.nodes);
  let nodes = req.session.user.nodes;
  let nodeArray = nodes.split(' ');
  let userInformList = [];
  let temp = {};
  for (let i = 0; i < nodeArray.length; i++) {
    console.log(nodeArray[i])
    temp['node'] = nodeArray[i];
    temp['water'] = parseInt(100 * Math.random() + 50);
    userInformList.push(temp);
    temp = {};
  }
  res.send(userInformList);
})


// router.get('/user', function (req, res) {
//   console.log(req.session.user.nodes);
//   let nodes = req.session.user.nodes;
//   let nodeArray = nodes.split(' ');
//   let userInformList = [];
//   let temp = {};
//   for (var i = 0; i < nodeArray.length; i++) {
//     console.log(nodeArray[i])
//     temp['node'] = nodeArray[i];
//     temp['water'] = parseInt(100 * Math.random() + 50);
//     temp['power'] = parseInt(10 * Math.random() + 1);
//     userInformList.push(temp);
//     temp = {};
//   }
//   res.send(userInformList);
// })

/*node/all/gateway-id/:id*/
/*Get node List of one gateway*/
router.get('/all/gateway-id/:id', function (req, response, next) {
  // let redis = require('redis'), rds_port = 6379, rds_host = ipAddress, rds_opts = {auth_pass: 'loraweb115'};
  let client = redis.createClient(rds_port, rds_host, rds_opts);
  client.on('connect', function () {
    client.smembers('Gateway:' + req.params.id + ":NodeList", function (err, nodeListRes) {
      if(err) {
        console.log(err);
        return response.json({"err":err});
      }
      let nodeList = [];
      let node = {};
      for (let index = 0; index < nodeListRes.length; index++) {
        node["nodeId"] = nodeListRes[index];
        nodeList.push(node);
        node = {};
      }
      console.log('=============================================')
      return response.json({"data":nodeList});
    });
  });
});

/*node/:nodeid/userhistoryinfo/start/:start/end/:end*/
router.get('/:nodeid/userhistoryinfo/start/:start/end/:end', function (req, res, next) {
  let infoList = [];
  let info = {};
  for (let i = 0; i < 50; i++) {
    info['nodeId'] = req.params.nodeid;
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

/*node/:nodeid/systemhistoryinfo/start/:start/end/:end*/
router.get('/:nodeid/systemhistoryinfo/start/:start/end/:end', function (req, res, next) {
  let infoList = [];
  let info = {};
  for (let i = 0; i < 50; i++) {
    info['nodeId'] = req.params.nodeid;
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



module.exports = router;
