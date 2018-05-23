<template>
  <div id="presentation" style="float:right;width: 70%; position: relative">
    <div ref="titleBar" style="text-align: center">
      <h1>Lora Console</h1>
    </div>

    <div ref="presentationMenu">
      <presentation-menu :presenterFlag="presenterFlag" @presenterFlag="showPresentation"></presentation-menu>
    </div>

    <div ref="dataPresenter" id="data_presenter" style="padding-left: 16px;background: #f7f8f3;">
      <user-real-time-info-panel v-show="presenterFlag == 'USERREALTIME'" :activeGatewayId="activeGatewayId"></user-real-time-info-panel>

      <system-real-time-info-panel v-show="presenterFlag == 'SYSTEMREALTIME'" :activeGatewayId="activeGatewayId"></system-real-time-info-panel>

      <lora-map v-show="presenterFlag == 'MAP'" ></lora-map>

      <user-history-info-panel :userHistoryInfo="userHistoryInfo" v-show="presenterFlag == 'USERHISTORY'"></user-history-info-panel>

      <system-history-info-panel :systemHistoryInfo="systemHistoryInfo" v-show="presenterFlag == 'SYSTEMHISTORY'"></system-history-info-panel>
    </div>
  </div>
</template>

<script>
  import presentationMenu from './PresenterMenu.vue'
  import userRealTimeInfoPanel from './UserRealTimeComponent/UserRealTimeInfoPanel.vue'
  import systemRealTimeInfoPanel from './SystemRealTimeComponent/SystemRealTimeInfoPanel.vue'
  import map from './Map/Map.vue'
  import userHistoryInfoPanel from './UserHistoryComponent/UserHistoryInfoPanel.vue'
  import systemHistoryInfoPanel from './SystemHistoryComponent/SystemHistoryInfoPanel.vue'

  export default {
    name: 'presentation',
    data: function () {
      return {
        presenterFlag: 'USERREALTIME'
      }
    },
    props: ['activeGatewayId', 'userHistoryInfo', 'systemHistoryInfo'],
    components: {
      'presentation-menu': presentationMenu,
      'user-real-time-info-panel': userRealTimeInfoPanel,
      'system-real-time-info-panel': systemRealTimeInfoPanel,
      'lora-map': map,
      'user-history-info-panel': userHistoryInfoPanel,
      'system-history-info-panel': systemHistoryInfoPanel
    },
    methods: {
      showPresentation: function (showPart) {
        this.presenterFlag = showPart
      }
    },
    created: function () {

    },
    mounted: function () {
      this.$refs.dataPresenter.style.height = 600 + 'px';
    }
  }
</script>
