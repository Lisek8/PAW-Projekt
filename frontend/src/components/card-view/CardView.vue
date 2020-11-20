<template>
  <div class="modal fade bd-example-modal-lg" id="cardViewModal" tabindex="-1" aria-labelledby="cardViewModal" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="cardViewModal">{{ card?.title }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <h6>Opis</h6>
            <div v-if="!editingDescription" @click="enableDescriptionEditing" class="description w-100 p-2">{{ card?.description }}</div>
            <div v-if="editingDescription" class="w-100">
              <textarea rows="4" v-model="editableDescription" class="container-fluid no-resize"></textarea>
              <div class="d-flex flex-row justify-content-end">
                <div class="btn btn-success" @click="disableDescriptionEditing(true)">Zapisz</div>
                <div class="btn ml-2" @click="disableDescriptionEditing(false)">
                  <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./cardView"></script>

<style scoped src="./cardView.css"></style>
