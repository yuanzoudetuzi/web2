<template>
  <div  style="white-space: nowrap">
    <table>
      <tr>
      <td width="180px">Time</td>
      <td width="180px">Node Id</td>
      <td width="180px">Freq</td>
      <td width="180px">Channel</td>
      <td width="180px">Modu</td>
      <td width="180px">RSSI</td>
      </tr>
    </table>
    <div style="overflow-y: scroll;height: 581px">
      <table>
      <system-real-time-info v-for="(infoItem, infoIndex) in systemRealTimeInfo"
                             :node_id="infoItem.nodeId" :freq="infoItem.freq"
                             :chan="infoItem.chan" :modu="infoItem.modu"
                             :rssi="infoItem.rssi" :time="infoItem.time"
      ></system-real-time-info>
      </table>
    </div>
  </div>
</template>

<script>
  import UserResource from 'vue-resource'
  import SystemRealTimeInfo from './SystemRealTimeInfo.vue'
  import Vue from 'vue'
  Vue.use(UserResource)

  export default {
    name: 'system-real-time-info-panel',
    data: function () {
      return {
        systemRealTimeInfo: [],
        systemRealTimeInfoNumber: 50
      }
    },
    components: {
      'system-real-time-info': SystemRealTimeInfo
    },
    props: ['activeGatewayId'],
    methods: {
      getSystemRealTimeInfo: function (gatewayId) {
        if (gatewayId !== '') {
          let that = this
          Vue.http.get('gateway/' + gatewayId + '/systemrealtimeinfo/' + that.systemRealTimeInfoNumber)
            .then(function (response) {
              if(!response.body.err) {
                that.systemRealTimeInfo = response.body.data
//                console.log('system info response:')
//                console.log(response.body.data);
              } else {
                  console.log('get systemrealtimeinfo is err,because ' + response.body.err)
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
        that.getSystemRealTimeInfo(that.activeGatewayId)
        setInterval(function () {
          that.getSystemRealTimeInfo(that.activeGatewayId)
        }, 1000*30)
      }, 0)
    }
  }
</script>

<style scoped>
  .infoTitle {
    width: 20%;
    display: inline-block;
    font-size: 16px;
  }
</style>
