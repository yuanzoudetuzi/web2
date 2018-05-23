<template>
  <tr>
    <td width="180px" >{{ time }}</td>
    <td width="180px" >{{ node_id }}</td>
    <td width="180px" >{{ freq }}</td>
    <td width="180px" >{{ chan }}</td>
    <td width="180px" >{{ modu }}</td>
    <td width="180px" >{{ rssi }}</td>
  </tr>
</template>

<script>
  export default {
    name: 'system-real-time-info',
    data: function () {
      return {

      }
    },
    props: ['time', 'node_id', 'freq', 'chan', 'rssi', 'modu']
  }
</script>

<style scoped>
</style>
