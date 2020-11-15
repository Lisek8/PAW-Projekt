<template>
  <div class="container-fluid h-100 text-light p-3" :style="{ backgroundImage: 'url(' + boardInfo.image + ')' }">
    <h2>{{ boardInfo.title }}</h2>
  </div>
</template>

<script src="./boardView"></script>

<style scoped src="./boardView.css"></style>
