<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Tworzenie tablicy</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="input-group mb-3">
            <input type="text" class="form-control" aria-label="Board Name" placeholder="Nazwa tablicy" v-model="boardName" @input="$emit('update:boardName', $event.target.value)">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Anuluj</button>
          <button type="button" class="btn btn-success" data-dismiss="modal" @click="validateAndClose">Stwórz</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./boardCreationModal"></script>

<style scoped src="./boardCreationModal.css"></style>
