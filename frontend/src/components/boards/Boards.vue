<template>
  <div class="container">
    <h1>Tablice</h1>
    <div class="container">
      <h4>
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-clock" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"/>
          <path fill-rule="evenodd" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
        </svg>
        Ostatnio oglądane
      </h4>
      <div class="d-flex flex-wrap bd-highlight mb-3 boardBox">
        <router-link :to="'/board/' + board.id" class="p-2 boardPreview mr-2 mb-2" :style="{ backgroundImage: 'url(' + board.image + ')' }" v-for="board in recentlyViewed" :key="board.title">
          <div class="boardTitle">
            {{ board.title }}
          </div>
        </router-link>
      </div>
    </div>
    <div class="container">
      <h4>
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
        </svg>
        Prywatne
      </h4>
      <div class="d-flex flex-wrap bd-highlight mb-3 boardBox">
         <router-link :to="'/board/' + board.id" class="p-2 boardPreview mr-2 mb-2" :style="{ backgroundImage: 'url(' + board.image + ')' }" v-for="board in privateBoards" :key="board.title">
          <div class="boardTitle">
            {{ board.title }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script src="./boards"></script>

<style scoped src="./boards.css"></style>
