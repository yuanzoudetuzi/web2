/**
 * Created by fanhualuomu on 17-5-17.
 */
/*var Vue = require('vue')
 var VueResource = require('vue-resource')
 Vue.use(VueResource)*/

// 创建一个 Vue 实例或 "ViewModel"
// 它连接 View 与 Model

new Vue({
  el: '#ordinary',
  data: {
    flag: null,
    waterArray: [],
    powerArray: [],
    informArray: []
  },
  components: {
    'water-component': {
      template: '#water',
      props: ['node', 'water']
    },
    'power-component': {
      template: '#power',
      props: ['node', 'power']
    }
  },
  methods: {
    setFlag: function (flag) {
      this.informArray = []
      this.flag = ''
      this.flag = flag
      console.log('flag= ' + flag)
     /* $.cxCalendar.defaults.type = 'datetime';
      $.cxCalendar.defaults.position = 'bottomLeft';
      $('#searchDate').cxCalendar();*/
    },
    inquiry: function (state) {
      this.waterArray = []
      this.powerArray = []
      this.informArray = []
      var response = []
      var temp = {}
      if (state === 'water') {
        response = this.getResponse('node/water')
        for (var i = 0; i < response.length; i++) {
          temp['node'] = response[i].node
          temp['water'] = response[i].water
          this.waterArray.push(temp)
          temp = {}
        }
      }

      response = this.getResponse('node/user')
      temp = {}
      console.log('response length is ' + response.length)
      for (var j = 0; j < response.length; j++) {
        temp['node'] = response[j].node
        temp['water'] = response[j].water
        temp['power'] = response[j].power
        this.informArray.push(temp)
        temp = {}
      }
      if (state === 'power') {
        response = this.getResponse('node/power')
        temp = {}
        console.log('response length is ' + response.length)
        for (var j = 0; j < response.length; j++) {
          temp['node'] = response[j].node
          temp['power'] = response[j].power
          this.waterArray.push(temp)
          temp = {}
        }
      }
    },
    getXMLHttp: function () {
      var xmlHttp
      if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlHttp = new XMLHttpRequest()
      } else {
        // code for IE6, IE5
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
      }
      return xmlHttp;
    },

    getResponse: function (url) {
      var responseHttp = this.getXMLHttp()
      responseHttp.open('GET', url, false)
      responseHttp.send()
       var response = JSON.parse(responseHttp.responseText)
      return response
    }
  },
  created: function () {
    let that = this
    that.flag = 'WATER'
  },
  mounted: function () {
    $.cxCalendar.defaults.type = 'datetime';
    $.cxCalendar.defaults.position = 'bottomLeft';
    $('#searchDate').cxCalendar();
    $('#startTime').cxCalendar();
  /*  $.cxCalendar.defaults.position = 'bottomLeft';*/
  /*  $.cxCalendar.defaults.endDate = new Date();
    $.cxCalendar.defaults.date = new Date();*/
    console.log('mounted')
  }
})
