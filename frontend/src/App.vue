<template>
  <div class="h-100 d-flex flex-column">
    <Menu />
    <div class="h-100 flex-grow-1">
        <div class="h-100 d-flex flex-column">
          <div v-if="!matchesBoardPage()" class="container mt-3 mb-3 pt-3 pb-3 shadow">
            <router-view/>
          </div>
          <div class="container-fluid d-flex flex-column p-0 flex-grow-1" v-else>
            <router-view/>
          </div>
        </div>
      </div>
  </div>
</template>

<script src="./app"></script>

<style src="./app.css"></style>
