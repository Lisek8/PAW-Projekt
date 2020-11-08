<template>
  <div class="container">
    <h1>Logowanie</h1>
    <form>
      <div class="form-group">
        <label for="login">Login</label>
        <input type="text" class="form-control" name="username" id="login">
      </div>
      <div class="form-group">
        <label for="password">Hasło</label>
        <input type="password" class="form-control" name="password" id="password">
      </div>
      <div class="alert alert-danger" role="alert">
        Nie udało się zalogować! Błędna nazwa użytkownika lub hasło.
      </div>
      <button type="button" class="btn btn-primary btn-lg btn-block">Zaloguj</button>
    </form>
  </div>
</template>

<script src="./login"></script>

<style scoped src="./login.css"></style>
