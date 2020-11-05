<template>
  <div class="content">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
import axios from 'axios'
import * as environment from '..\\env.config.js'
export default {
  name: 'Content',
  data () {
    return {
      msg: ''
    }
  },
  created () {
    axios.get(environment.restServices + 'hello')
      .then(res => {
        this.msg = res.data
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }
}
</script>

<style scoped>
  .content {
      margin-top: 40px;
      padding: 10px;
    }
</style>
