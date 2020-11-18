<template>
  <div class="modal fade" id="cardCreationModal" tabindex="-1" aria-labelledby="cardCreationModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="cardCreationModal">Tworzenie karty</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="input-group mb-3">
            <input type="text" class="form-control" aria-label="Card Name" placeholder="Nazwa karty" v-model="cardName" @input="$emit('update:cardName', $event.target.value)">
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

<script src="./cardCreationModal"></script>

<style scoped src="./cardCreationModal.css"></style>
