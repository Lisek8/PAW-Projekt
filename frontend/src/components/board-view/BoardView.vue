<template>
  <div class="container-fluid h-100 text-light pt-3 pl-3 pr-3 d-flex flex-column page-background" :style="{ backgroundImage: 'url(' + boardInfo.image + ')' }">
    <div class="d-flex flex-row align-items-center mb-2">
      <div>
        <input v-if="titleEditing" v-model="editableTitle" @blur="endTitleEditing()" @keyup.enter="endTitleEditing()" v-focus>
        <h2 v-else @click="startTitleEditing()">{{ boardInfo.title }}</h2>
      </div>
      <div class="horizontal-divider"></div>
      <div class="board-menu-button p-2" @click="toggleBoardVisibility">
        <svg v-if="boardInfo.visibility === possibleVisibilities.Private" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-lock-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9z"/>
          <path fill-rule="evenodd" d="M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"/>
        </svg>
        <svg v-if="boardInfo.visibility === possibleVisibilities.Public" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-globe" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4H2.255a7.025 7.025 0 0 1 3.072-2.472 6.7 6.7 0 0 0-.597.933c-.247.464-.462.98-.64 1.539zm-.582 3.5h-2.49c.062-.89.291-1.733.656-2.5H3.82a13.652 13.652 0 0 0-.312 2.5zM4.847 5H7.5v2.5H4.51A12.5 12.5 0 0 1 4.846 5zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5H7.5V11H4.847a12.5 12.5 0 0 1-.338-2.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12H7.5v2.923c-.67-.204-1.335-.82-1.887-1.855A7.97 7.97 0 0 1 5.145 12zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11H1.674a6.958 6.958 0 0 1-.656-2.5h2.49c.03.877.138 1.718.312 2.5zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12h2.355a7.967 7.967 0 0 1-.468 1.068c-.552 1.035-1.218 1.65-1.887 1.855V12zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5h-2.49A13.65 13.65 0 0 0 12.18 5h2.146c.365.767.594 1.61.656 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4H8.5V1.077c.67.204 1.335.82 1.887 1.855.173.324.33.682.468 1.068z"/>
        </svg>
        {{ boardInfo.visibility }}
      </div>
      <div class="board-menu-button p-2 ml-auto" data-toggle="modal" data-target="#archiveBoardConfirmationModal">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-archive" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
        </svg>
        Zamknij tablicę
      </div>
    </div>
    <div class="d-flex flex-row flex-nowrap list-container flex-grow-1">
      <draggable v-model="boardInfo.lists" class="d-flex flex-row flex-nowrap" group="lists" @start="drag=true" @end="drag=false" item-key="id" @change="handleMove">
        <template #item="{element}">
          <div class="p-2 mr-3 mb-3 list text-dark">
            <span class="list-title">
              <input v-if="listEditing[element.id.toString()]" v-model="editableListTitle" @blur="endListEditing(element.id)" @keyup.enter="endListEditing(element.id)" v-focus>
              <span v-else @click="startListEditing(element.id)">{{ element.title }}</span>
            </span>
            <div class="card-list-container">
              <div class=" card-view p-2 m-1" v-for="card in element.items" :key="card" @click="openCardView(element.id, card.id)" data-toggle="modal" data-target="#cardViewModal">
                <div class="d-flex flex-row flex-wrap">
                  <div v-for="label in card.labels" :key="label" class="label text-light text-center mr-1" :style="{ backgroundColor: label.color }" @click.stop="toggleLabelVisibility">
                    <span v-if="labelsVisible">{{ label.name }}</span>
                  </div>
                </div>
                <span>{{ card.title }}</span>
                <div class="d-flex flex-row">
                  <div v-bind:class = "(isFutureDate(card))?'due-date mb-2 p-1 text-dark':'due-date mb-2 p-1 text-light'" v-if="card.dueDate != null" :style="{ backgroundColor: getDueDateLabelColor(card) }">
                    <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-clock" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"/>
                      <path fill-rule="evenodd" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                    {{ formatDueDateString(card.dueDate) }}
                  </div>
                  <div v-if="card.taskList != null && card.taskList.items.length > 0" class="ml-2 due-date p-1" v-bind:class="(card.taskList.items.filter(item => item.done).length === card.taskList.items.length) ? 'task-list-complete text-light': ''">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
                      <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
                      <path d="M8.354 10.354l7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                    </svg>
                    {{ card.taskList.items.filter(item => item.done).length }}/{{ card.taskList.items.length }}
                  </div>
                </div>
              </div>
            </div>
            <div class="p-2 mt-2 add-card-button" @click="openCardCreationModal(element.id)" data-toggle="modal" data-target="#cardCreationModal">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
              <span>
                Dodaj kartę
              </span>
            </div>
          </div>
        </template>
      </draggable>
      <div class="p-2 add-list-button"  @click="openListCreationModal" data-toggle="modal" data-target="#listCreationModal">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
        <span>
          Dodaj listę
        </span>
      </div>
    </div>
  </div>
  <ListCreationModal @create-list="handleListCreation"></ListCreationModal>
  <CardCreationModal @create-card="handleCardCreation"></CardCreationModal>
  <CardView v-model:listinfo="listId" v-model:cardinfo="card" v-model:labels="labels" @card-update="handleCardUpdate" @create-label="handleCreateLabel" @edit-label="handleEditLabel" @delete-label="handleDeleteLabel"></CardView>
  <ArchiveBoardConfirmationModal @archive-board='archiveBoard'></ArchiveBoardConfirmationModal>

</template>

<script src="./boardView"></script>

<style scoped src="./boardView.css"></style>
