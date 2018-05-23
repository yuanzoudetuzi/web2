<template>
  <div class="gateway">
    <div>
      <div class="row">
        <div class="col-md-6 col-xs-6">
          <div>
            网关ID：
          </div>
        </div>
        <div class="col-md-6 col-xs-6">
          <div>
            {{ gateway_id }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'gateway-item',
    props: ['gateway_id']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .gateway {
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
    border-top: solid 1px #000000;
    border-bottom: solid 1px #000000;
    cursor:pointer;
    font-size: 16px;
  }
  .gateway:hover {
    color: orangered;
  }
</style>
