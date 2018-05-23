<template>
  <div style="white-space: nowrap">
    <table>
      <tr>
        <td width="180px">Time</td>
        <td width="180px">Node Id</td>
        <td width="180px">Water</td>
        <td width="180px">Power</td>
        <td width="180px">Longitude</td>
        <td width="180px">Latitude</td>
      </tr>
    </table>
    <div v-if="userHistoryInfo.length === 0" style='text-align: center;white-space: normal;color: orangered'>
      <h2>No history information to show. Please submit request in the 'Search' panel.</h2>
    </div>
    <div style="overflow-y: scroll;height: 581px">
      <table>
        <user-history-info v-for="(infoItem, infoIndex) in userHistoryInfo"
                           :node_id="infoItem.nodeId" :water="infoItem.water"
                           :power="infoItem.power" :longitude="infoItem.longitude"
                           :latitude="infoItem.latitude" :time="infoItem.time"
        ></user-history-info>
      </table>
    </div>
  </div>
</template>

<script>
  import userHistoryInfo from './UserHistoryInfo.vue'

  export default {
    name: 'user-history-info-panel',
    data: function () {
      return {}
    },
    props: ['userHistoryInfo'],
    components: {
      'user-history-info': userHistoryInfo
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
