<template>
  <form onsubmit="return false" style="padding-left: 16px;padding-right: 16px;padding-top: 16px">
    <div>Gateway Id:</div>
    <select v-model="gatewayId" size="2" multiple class="form-control">
      <option selected="selected">空</option>
      <option v-for="item in gatewayList" :value="item.gatewayId">{{item.gatewayId}}</option>
    </select>
    <div style="margin-top: 16px">Node Id:</div>
    <input v-model="nodeId"  type="text" style="width: 100%">
    <div style="margin-top: 16px">Start Time:</div>
    <div>
      <input ref="start" id="startTime" type="datetime" data-format="YYYY-MM-DD HH:mm:ss"
             style="width: 100%">
    </div>
    <div style="margin-top: 16px">End Time:</div>
    <div>
      <input ref="end" id="endTime" type="datetime" data-format="YYYY-MM-DD HH:mm:ss"
             style="width: 100%">
    </div>

    <input @click="searchHistoryInfo" type="submit" value="Search" style="margin-top: 32px;width: 100%">
  </form>
</template>

<script>
  import Vue from 'vue'
  import resource from 'vue-resource'
  Vue.use(resource)

  export default {
    name: 'search',
    data: function () {
      return {
        gatewayId: '',
        nodeId: ''
      }
    },
    props: ['gatewayList', 'activeGateway', 'activeNode', 'userHistoryInfo', 'systemHistoryInfo'],
    methods: {
      checkInputValid(){
        if (this.gatewayId === '' && this.nodeId === ''){
            this.gatewayId = gatewayList[0].gatewayId
            console.log("gatewayId" +  this.gatewayId )
        /*  this.userHistoryInfo = []
          this.$emit('userHistoryInfo', this.userHistoryInfo)*/
          return false;
        }
        if (this.$refs.start.value === '' || this.$refs.end.value === ''){
        /*  this.userHistoryInfo = []
          this.$emit('userHistoryInfo', this.userHistoryInfo)*/
          return false;
        }
        else {
          return true;
        }
      },
      searchHistoryInfo(){
        if (!this.checkInputValid()){
          let myDate = new Date()
          let tempDate = myDate.toLocaleDateString().split('/')
          let end = tempDate[0] + tempDate[1] + tempDate[2] + myDate.getHours()
            + myDate.getMinutes() + myDate.getSeconds();
          let yesterday = new Date(new Date().getTime() - 86400000);
          let tempDate1 = yesterday.toLocaleDateString().split('/');
          let start = tempDate1[0] + tempDate1[1] + tempDate1[2] + yesterday.getHours()
            + yesterday.getMinutes() + yesterday.getSeconds();
          console.log(end);
          console.log(start);
          Vue.http.get('gateway/' + '000' + '/userhistoryinfo/start/' + start + '/end/' + end)
            .then(function (response) {
              that.userHistoryInfo = response.body
              that.$emit('userHistoryInfo', that.userHistoryInfo)
            })
          return 0
        }
        let temp = this.$refs.start.value.split(' ')
        let tempDate = temp[0].split('-')
        let tempTime = temp[1].split(':')
        let start = tempDate[0] + tempDate[1] + tempDate[2] + tempTime[0] + tempTime[1] + tempTime[2]
        temp = this.$refs.end.value.split(' ')
        tempDate = temp[0].split('-')
        tempTime = temp[1].split(':')
        let end = tempDate[0] + tempDate[1] + tempDate[2] + tempTime[0] + tempTime[1] + tempTime[2]
        let that = this
        console.log("start = " + start)
        console.log("end = " + end)

        if (this.nodeId === '') {
          Vue.http.get('gateway/' + this.gatewayId + '/userhistoryinfo/start/' + start + '/end/' + end)
            .then(function (response) {
              that.userHistoryInfo = response.body
              that.$emit('userHistoryInfo', that.userHistoryInfo)
          })
          Vue.http.get('gateway/' + this.gatewayId + '/systemhistoryinfo/start/' + start + '/end/' + end)
            .then(function (response) {
              that.systemHistoryInfo = response.body
              that.$emit('systemHistoryInfo', that.systemHistoryInfo)
            })
        } else {
          Vue.http.get('node/' + this.nodeId + '/userhistoryinfo/start/' + start + '/end/' + end)
            .then(function (response) {
              that.userHistoryInfo = response.body
              that.$emit('userHistoryInfo', that.userHistoryInfo)
            })
          Vue.http.get('node/' + this.nodeId + '/systemhistoryinfo/start/' + start + '/end/' + end)
            .then(function (response) {
              that.systemHistoryInfo = response.body
              that.$emit('systemHistoryInfo', that.systemHistoryInfo)
            })
        }
      }
    },
    mounted: function () {
      $.cxCalendar.defaults.type = 'datetime';
      $.cxCalendar.defaults.position = 'bottomLeft';
      $('#startTime').cxCalendar();
      $('#endTime').cxCalendar();
    }
  }
</script>

<style scope></style>
