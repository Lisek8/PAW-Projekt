<template>
  <div class="container">
    <h1>Logowanie</h1>
    <form>
      <div class="form-group">
        <div class="form-row">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          </svg>
          <div class="col">
            <input type="text" v-model="loginName" class="form-control" name="username" id="login" placeholder="Użytkownik">
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="form-row">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-key-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
          <div class="col">
            <input type="password" v-model="loginPassword" class="form-control" name="password" id="password" placeholder="Hasło">
          </div>
        </div>
      </div>
      <div v-show="loginFailure" class="alert alert-danger" role="alert">
        Nie udało się zalogować! Błędna nazwa użytkownika lub/i hasło.
      </div>
      <button type="button" @click="changeStatus" class="btn btn-primary btn-lg btn-block">Zaloguj</button>
    </form>
  </div>
</template>

<script src="./login"></script>

<style scoped src="./login.css"></style>
