<template>
  <div id="index">
    <management @userHistoryInfo="transitUserHistoryInfo" @systemHistoryInfo="transitSystemHistoryInfo" @activeGatewayId="transitActiveGatewayId"></management>
    <presentation :userHistoryInfo="userHistoryInfo" :systemHistoryInfo="systemHistoryInfo" :activeGatewayId="activeGatewayId"></presentation>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  import management from './components/management/Management.vue'
  import presentation from './components/presentation/Presentation.vue'
  export default {
    name: 'index',
    data: function () {
      return {
        activeGatewayId: '000',
        userHistoryInfo: [],
        systemHistoryInfo: []
      }
    },
    components: {
      'management': management,
      'presentation': presentation,
    },
    methods: {
      transitActiveGatewayId: function (activeGatewayId) {
        this.activeGatewayId = activeGatewayId
      },
      transitUserHistoryInfo: function (userHistoryInfo) {
        this.userHistoryInfo = userHistoryInfo
      },
      transitSystemHistoryInfo: function (systemHistoryInfo) {
        this.systemHistoryInfo = systemHistoryInfo
      }
    },
    created: function () {
     /* Vue.http.get('gateway/redis')
        .then(function (response) {
          console.log(response.body)
        }, function (error) {
          console.log(error)
        })*/
    }
  }
</script>

<style>
  #index {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    overflow-x: hidden;
  }
</style>
