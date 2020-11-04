<template>
  <div>
    <h1>test</h1>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Content',
  created () {
    axios.get('http://localhost:8080/hello')
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }
}
</script>

<style scoped>
</style>
