<template>
  <div>
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
import axios from 'axios'
import * as environment from '..\\..\\app.config.js'
export default {
  name: 'Content',
  data () {
    return {
      msg: ''
    }
  },
  created () {
    axios.get(environment.restServicesPath + 'hello')
      .then(res => { this.msg = res.data.hello })
      .catch(err => console.log(err))
  }
}
</script>

<style scoped>
</style>
