<template>
  <div class="container-fluid h-100 text-light p-3" :style="{ backgroundImage: 'url(' + boardInfo.image + ')' }">
    <h2>{{ boardInfo.title }}</h2>
    <div class="d-flex flex-row flex-nowrap">
      <div class="p-2 add-list-button"  @click="openListCreationModal" data-toggle="modal" data-target="#listCreationModal">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
        <span>
          Dodaj listę
        </span>
      </div>
    </div>
  </div>
  <ListCreationModal v-model:isVisible="showListCreationModal" @create-list="handleListCreation"></ListCreationModal>
</template>

<script src="./boardView"></script>

<style scoped src="./boardView.css"></style>
