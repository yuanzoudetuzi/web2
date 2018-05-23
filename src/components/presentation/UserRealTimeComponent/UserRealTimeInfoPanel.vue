<template>
  <div style="white-space: nowrap;height: 600px;overflow-y: auto;overflow-x: auto">
    <table>
      <tr>
        <td width="180px">Time</td>
        <td width="180px">Node Id</td>
        <td width="180px">Altitude</td>
        <td width="180px">Temperature</td>
        <td width="180px">Longitude</td>
        <td width="180px">Latitude</td>
      </tr>
    </table>
    <div style="overflow-y: scroll;height: 581px">
      <table>
        <user-real-time-info v-for="(infoItem, infoIndex) in userRealTimeInfo"
                             :node_id="infoItem.nodeId" :water="infoItem.water"
                             :power="infoItem.power" :longitude="infoItem.longitude"
                             :latitude="infoItem.latitude" :time="infoItem.time"></user-real-time-info>
      </table>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import userRealTimeInfo from './UserRealTimeInfo.vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)

  export default {
    name: 'user-real-time-info-panel',
    data: function () {
      return {
        userRealTimeInfo: [],
        userRealTimeInfoNumber: 50
      }
    },
    components: {
      'user-real-time-info': userRealTimeInfo
    },
    props: ['activeGatewayId'],
    methods: {
      getUserRealTimeInfo: function (gatewayId) {
        if (gatewayId !== '') {
          let that = this
          Vue.http.get('gateway/' + gatewayId + '/userrealtimeinfo/' + this.userRealTimeInfoNumber)
            .then(function (response) {
              if(!response.body.err) {
                that.userRealTimeInfo = response.body.data
//                console.log('user info response:')
//                console.log(response.body.data);
              } else {
                console.log('get userrealtimeinfo is err,because ' + response.body.err)
              }

            }, function (error) {
              console.log(error)
            })
        }
      }
    },
    created: function () {
      let that = this
      setTimeout(function () {
        that.getUserRealTimeInfo(that.activeGatewayId)
        setInterval(function () {
          that.getUserRealTimeInfo(that.activeGatewayId)
        }, 1000*30)
      }, 0)
    }
  }
</script>

<style scoped>
</style>
