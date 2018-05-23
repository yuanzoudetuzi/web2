<template>
  <div class="node row">
    <div class="col-md-2 col-xs-2"></div>
    <div class="col-md-4 col-xs-4">节点Id</div>
    <div class="col-md-6 col-xs-6">{{ node_id }}</div>
  </div>
</template>

<script>
  export default {
    name: 'node-item',
    props: {
      node_id: {
        type: String
      }
    }
  }
</script>

<style scoped>
  .node {
    padding: 7px 16px 0px;
    cursor: pointer;
  }
  .node:hover {
    color: orangered;
  }
</style>
