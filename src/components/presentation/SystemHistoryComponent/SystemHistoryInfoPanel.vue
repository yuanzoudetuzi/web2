<template>
  <div style="white-space: nowrap">
    <table>
      <tr>
        <td width="180px">Time</td>
        <td width="180px">Node Id</td>
        <td width="180px">Freq</td>
        <td width="180px">Channel</td>
        <td width="180px">Up_link</td>
        <td width="180px">Down_link</td>
      </tr>
    </table>
    <div v-if="systemHistoryInfo.length === 0" style='text-align: center;white-space: normal;color: orangered;'>
      <h2>No history information to show. Please submit request in the 'Search' panel.</h2>
    </div>
    <div style="overflow-y: scroll;height: 581px">
      <table>
        <system-history-info v-for="(infoItem, infoIndex) in systemHistoryInfo"
                             :node_id="infoItem.nodeId" :freq="infoItem.freq"
                             :channel="infoItem.channel" :up_link="infoItem.upLink"
                             :down_link="infoItem.downLink" :time="infoItem.time"
        ></system-history-info>
      </table>
    </div>
  </div>
</template>

<script>
  import systemHistoryInfo from './SystemHistoryInfo.vue'
  export default {
    name: 'system-history-info-panel',
    data: function () {
      return {}
    },
    props: ['systemHistoryInfo'],
    components: {
      'system-history-info': systemHistoryInfo
    },
  }
</script>

<style scoped>
  .infoTitle {
    width: 20%;
    display: inline-block;
    font-size: 16px;
  }
</style>
