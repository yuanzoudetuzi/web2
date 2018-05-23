<template>
  <div id="management_menu"
       style="height: 32px;width: 100%;color:black;text-align: center;border-bottom: solid 1px black">
    <div class="row">
      <div style="height: 32px;line-height: 32px;white-space: nowrap" id="device_tree" class="col-md-3 col-xs-3 menu-button"
           @click="showManagementInterface('DEVICETREE')">
        <div v-if="interfaceFlag != 'DEVICETREE'">Device Tree</div>
        <div class="active-button" v-if="interfaceFlag == 'DEVICETREE'">
          Device Tree
        </div>
      </div>
      <div style="height: 32px;line-height: 32px" id="command" class="col-md-3 col-xs-3 menu-button"
           @click="showManagementInterface('COMMAND')">
        <div v-if="interfaceFlag != 'COMMAND'">Command</div>
        <div v-if="interfaceFlag == 'COMMAND'" class="active-button">
          Command
        </div>
      </div>
      <div style="height: 32px;line-height: 32px" id="search" class="col-md-3 col-xs-3 menu-button"
           @click="showManagementInterface('SEARCH')">
        <div v-if="interfaceFlag != 'SEARCH'">Search</div>
        <div v-if="interfaceFlag == 'SEARCH'" class="active-button">
          Search
        </div>
      </div>
      <div style="height: 32px;line-height: 32px" id="output" class="col-md-3 col-xs-3 menu-button"
           @click="showManagementInterface('OUTPUT')">
        <div v-if="interfaceFlag != 'OUTPUT'">Output</div>
        <div v-if="interfaceFlag == 'OUTPUT'" class="active-button">
          Output
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'management-menu',
    data: function () {

    },
    props: ['interfaceFlag'],
    methods: {
      showManagementInterface: function (showFlag) {
        this.interfaceFlag = showFlag
        this.$emit('interfaceShowFlag', showFlag)
      }
    }
  }
</script>

<style scoped>
  .menu-button {
    text-align: center;
    cursor: pointer;
    line-height: 32px;
  }
  .active-button {
    background: orangered;
  }
</style>
