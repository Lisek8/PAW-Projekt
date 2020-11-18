<template>
  <div class="modal fade" id="listCreationModal" tabindex="-1" aria-labelledby="listCreationModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="listCreationModal">Tworzenie listy</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="input-group mb-3">
            <input type="text" class="form-control" aria-label="List Name" placeholder="Nazwa listy" v-model="listName" @input="$emit('update:listName', $event.target.value)">
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

<script src="./listCreationModal"></script>

<style scoped src="./listCreationModal.css"></style>
