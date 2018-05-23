<template>
  <div id="management" ref="management" style="float:left;border-right:solid 1px #000000;width: 30%">

    <div ref="management_menu" style="background: #3399ff">
    <management-menu :interfaceFlag="interfaceFlag" @interfaceShowFlag="showManagementInterface"></management-menu>
    </div>

    <div ref="management_interface" id="management_interface"
         style="overflow-y: auto">
      <!--1-->
      <div v-if="interfaceFlag == 'DEVICETREE'" v-for="(item, index) in gatewayList">
        <gateway-item :gateway_id="item.gatewayId" :key="index" @click.native="showNodeList(item.gatewayId)">
        </gateway-item>
        <div v-if="showNode == item.gatewayId">
          <node-item v-for="(nodeItem, nodeIndex) in nodeArray[item.gatewayId]" :node_id="nodeItem.nodeId"
                     :key="nodeIndex">
          </node-item>
        </div>
      </div>

      <!--2-->
      <div v-if="interfaceFlag == 'COMMAND'">
        <command-menu></command-menu>
      </div>

      <!--3-->
      <div v-if="interfaceFlag == 'SEARCH'">
        <search-view @userHistoryInfo="transitUserHistoryInfo" @systemHistoryInfo="transitSystemHistoryInfo" :gatewayList="gatewayList"></search-view>
      </div>

      <!--4-->
      <div v-if="interfaceFlag == 'OUTPUT'">output</div>
    </div>
  </div>
</template>

<script>
  import gatewayItem from './GatewayItem.vue'
  import nodeItem from './NodeItem.vue'
  import search from './Search.vue'
  import managementMenu from './ManagementMenu.vue'
  import command from './Command.vue'
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)

  export default {
    name: 'management',
    data () {
      return {
        interfaceFlag: 'DEVICETREE',
        showNode: '',
        gatewayList: [],
        nodeArray: [],
        userHistoryInfo: [],
        systemHistoryInfo: []
      }
    },
    components: {
      'gateway-item': gatewayItem,
      'node-item': nodeItem,
      'search-view': search,
      'management-menu': managementMenu,
      'command-menu': command
    },
    methods: {
      showManagementInterface: function (showFlag) {
        this.interfaceFlag = showFlag
      },
      showNodeList: function (gatewayId) {
        this.$emit('activeGatewayId', gatewayId)    //后加
        if (this.showNode === gatewayId) {
          this.showNode = ''
        } else {
          this.showNode = gatewayId
        }
      },
      transitSystemHistoryInfo: function (systemHistoryInfo) {
        this.$emit('systemHistoryInfo', systemHistoryInfo)
      },
      transitUserHistoryInfo: function (userHistoryInfo) {
        this.$emit('userHistoryInfo', userHistoryInfo)
      }
    },
    created: function () {
      let that = this;
      Vue.http.get('gateway/all').then(function (response) {
        if(!response.body.err) {
          that.gatewayList = response.body.data
          that.$emit('activeGatewayId', that.gatewayList[0].gatewayId)
        } else {
          console.log('get all gateway is err,because ' + response.body.err)
        }

      }, function (error) {
        console.log(error)
      }).then(function () {
        for (let i = 0; i < that.gatewayList.length; i++) {
          Vue.http.get('node/all/gateway-id/' + that.gatewayList[i].gatewayId).then(function (response) {
            if(!response.body.err) {
              that.nodeArray[that.gatewayList[i].gatewayId] = response.body.data
            } else {
              console.log('get all gateway is err,because ' + response.body.err);
            }
          }, function (error) {
            console.log('Error: ' + error)
          })
        }
      })
    },
    mounted () {
      let that = this
      this.$refs.management.style.height = document.body.scrollHeight + 'px'
      this.$refs.management_interface.style.height = (document.body.scrollHeight - this.$refs.management_menu.offsetHeight)+ 'px'
    }
  }
</script>

<style scoped>
</style>
