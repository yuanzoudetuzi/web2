<template>
  <div id="presenter_menu"  style="background: #3399ff;height: 32px">
    <div class="menu-button"  @click="showPresentation('USERREALTIME')">
      <div v-if="presenterFlag != 'USERREALTIME'">
        UserRealTime
      </div>
      <div v-if="presenterFlag == 'USERREALTIME'" style="background: orangered">
        UserRealTime
      </div>
    </div>

    <div class="menu-button" @click="showPresentation('SYSTEMREALTIME')">
      <div v-if="presenterFlag != 'SYSTEMREALTIME'">
        SystemRealTime
      </div>
      <div v-if="presenterFlag == 'SYSTEMREALTIME'"
           style="background: orangered">
        SystemRealTime
      </div>
    </div>

    <div class="menu-button" @click="showPresentation('MAP')">
      <div v-if="presenterFlag != 'MAP'">
        Map
      </div>
      <div v-if="presenterFlag == 'MAP'"
           style="background: orangered">
        Map
      </div>
    </div>

    <div class="menu-button" @click="showPresentation('USERHISTORY')">
      <div v-if="presenterFlag != 'USERHISTORY'">
        UserHistory
      </div>
      <div v-if="presenterFlag == 'USERHISTORY'"
           style="background: orangered">
        UserHistory
      </div>
    </div>

    <div class="menu-button" @click="showPresentation('SYSTEMHISTORY')">
      <div v-if="presenterFlag != 'SYSTEMHISTORY'">
        SystemHistory
      </div>
      <div v-if="presenterFlag == 'SYSTEMHISTORY'"
           style="background: orangered">
        SystemHistory
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'presenter-menu',
    data: function () {
      return {

      }
    },
    props: ['presenterFlag'],
    methods: {
      showPresentation: function (showFlag) {
        this.presenterFlag = showFlag
        this.$emit('presenterFlag', showFlag)
      }
    }
  }
</script>

<style scoped>
  .menu-button {
    height: 32px;
    line-height: 32px;
    width: 15%;
    display: inline-block;
    text-align: center;
    cursor: pointer;
  }
</style>
