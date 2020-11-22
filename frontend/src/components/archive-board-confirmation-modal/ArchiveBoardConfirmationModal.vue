<template>
  <div class="modal fade" id="archiveBoardConfirmationModal" tabindex="-1" aria-labelledby="archiveBoardConfirmationModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="archiveBoardConfirmationModal">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-archive" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
            </svg>
            Zamykanie tablicy
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container p-2">Czy na pewno chcesz zamknąć tą tablicę?</div>
        </div>
        <div class="modal-footer">
          <div class="btn btn-outline-secondary" type="button" data-dismiss="modal" aria-label="Close">Anuluj</div>
          <div class="btn btn-danger" type="button" data-dismiss="modal" aria-label="Close" @click="archiveBoard">Zamknij</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./archiveBoardConfirmationModal"></script>

<style scoped src="./archiveBoardConfirmationModal.css"></style>
