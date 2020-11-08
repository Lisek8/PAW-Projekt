<template>
  <Menu />
  <Content />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Content from './components/Content.vue';
import Menu from './components/Menu.vue';

@Options({
  components: {
    Content,
    Menu
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
