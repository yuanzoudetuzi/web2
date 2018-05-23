<template>
    <tr>
      <td width="180px" title="time">{{ time }}</td>
      <td width="180px" title="nodeId">{{ node_id }}</td>
      <td width="180px" title="water">{{ water }}</td>
      <td width="180px" title="power">{{ power }}</td>
      <td width="180px" title="longitude">{{ longitude }}</td>
      <td width="180px" title="latitude">{{ latitude }}</td>
    </tr>
</template>

<script>
  export default {
    name: 'user-real-time-info',
    props: ['time', 'node_id', 'water', 'power', 'longitude', 'latitude']
  }
</script>

<style scoped>

</style>
