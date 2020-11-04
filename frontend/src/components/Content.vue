<template>
  <div>
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Content',
  data () {
    return {
      msg: ''
    }
  },
  created () {
    axios.get('https://localhost:8080/hello')
      .then(res => { this.msg = res.data.hello })
      .catch(err => console.log(err))
  }
}
</script>

<style scoped>
</style>
