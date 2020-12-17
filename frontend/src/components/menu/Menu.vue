<template>
  <nav class="navbar navbar-dark bg-info">
  <router-link to="/" class="navbar-brand">
    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-kanban-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M2.5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-11zm5 2a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-1zm-5 1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm9-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-1z"/>
    </svg>
    Trollo
  </router-link>
  <ul class="navbar-nav ml-md-auto">
      <li class="nav-item" v-if="!loggedIn">
        <router-link to="/login" class="btn btn-outline-warning my-2 my-sm-0">Zaloguj się</router-link>
        <router-link to="/register" class="btn btn-outline-light my-2 my-sm-0 ml-2">Zarejestruj się</router-link>
      </li>
      <template v-else>
        <form class="form-inline" @submit.prevent>
          <li class="nav-item">
            <button @click="openBoardCreationModal" class="btn btn-secondary my-2 my-sm-0" data-toggle="modal" data-target="#boardCreationModal">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
            </button>
          </li>
          <li class="nav-item">
            <router-link to="/boards" class="btn btn-secondary my-2 my-sm-0 ml-2">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-card-text" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                <path fill-rule="evenodd" d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
              </svg>
              Tablice
            </router-link>
          </li>
          <li class="nav-item">
            <button @click="logout" class="btn btn-danger my-2 my-sm-0 ml-2">Wyloguj się</button>
          </li>
        </form>
      </template>
  </ul>
  </nav>
  <BoardCreationModal v-model:isVisible="showBoardCreationModal" @create-board="handleBoardCreation"></BoardCreationModal>
</template>

<script src="./menu"></script>

<style scoped src="./menu.css"></style>
