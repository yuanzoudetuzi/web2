<template>
  <tr>
    <td width="180px">{{ time }}</td>
    <td width="180px">{{ node_id }}</td>
    <td width="180px">{{ freq }}</td>
    <td width="180px">{{ channel }}</td>
    <td width="180px">{{ up_link }}</td>
    <td width="180px">{{ down_link }}</td>
  </tr>
</template>

<script>
  export default {
    name: 'system-history-info',
    props: ['time', 'node_id', 'freq', 'channel', 'up_link', 'down_link']
  }
</script>

<style scoped>
  /*.infoScope {
    display: inline-block;
    width: 20%;
    padding-top: 7px;
  }*/
</style>
