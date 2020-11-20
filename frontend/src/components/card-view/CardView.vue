<template>
  <div class="modal fade" id="cardViewModal" tabindex="-1" aria-labelledby="cardViewModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="cardViewModal">{{ card?.title }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h6>Opis</h6>
          <div>{{ card?.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./cardView"></script>

<style scoped src="./cardView.css"></style>
