<template>
  <div class="modal fade bd-example-modal-lg" id="cardViewModal" tabindex="-1" aria-labelledby="cardViewModal" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content bg-custom-light">
        <div class="modal-header">
          <h5 class="modal-title" id="cardViewModal">{{ card?.title }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col">
              <div class="container-fluid mb-2" v-if="card.labels.length > 0">
                <h6>Etykiety</h6>
                <div class="d-flex flex-row">
                  <div v-for="label in card.labels" :key="label" class="label text-light text-center mr-2" :style="{ backgroundColor: label.color }">
                    {{ label.name }}
                  </div>
                </div>
              </div>
              <div class="container-fluid">
                <h6>Opis</h6>
                <div v-if="!editingDescription" @click="enableDescriptionEditing" class="description w-100 p-2">{{ card?.description }}</div>
                <div v-if="editingDescription" class="w-100">
                  <textarea rows="4" v-model="editableDescription" class="container-fluid no-resize" v-focus></textarea>
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
            <div class="col-3">
              <div>
                <span class="text-secondary">Dodaj do karty</span>
                <div class="dropdown">
                  <div class="card-menu-button p-2 mb-2" type="button" id="dropdownMenuLabels" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-tag" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M2 2v4.586l7 7L13.586 9l-7-7H2zM1 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2z"/>
                      <path fill-rule="evenodd" d="M4.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                    </svg>
                    Etykiety
                  </div>
                  <div class="dropdown-menu label-dropdown bg-custom-light" aria-labelledby="dropdownMenuLabels" @click.stop="">
                    <span class="container-fluid text-center text-secondary label-dropdown-header">Etykiety</span>
                    <div class="dropdown-divider"></div>
                    <div class="label-dropdown-item" v-for="label in labels.labels" :key="label">
                      <div class="d-flex flex-row align-items-center ml-2 mr-2">
                        <div @click="toggleCardLabel(label.id)" class="p-2 mr-2 mt-1 mb-1 ml-2 label-dropdown-item-content flex-grow-1 text-light" :style="{ backgroundColor: label.color }">
                          <div class="d-flex flex-row">
                            <div class="label-pick-name col-10">{{ label.name }}</div>
                            <div class="col-2 font-weight-bold" v-if="isLabelApplied(label.id)">
                              <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" class="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
