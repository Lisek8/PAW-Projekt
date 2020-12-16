import { Board, BoardVisibility } from '@/dataStructures/board';
import { Environment } from './../../../env.config';
import ListCreationModal from '../list-creation-modal/ListCreationModal.vue';
import CardCreationModal from '../card-creation-modal/CardCreationModal.vue';
import ArchiveBoardConfirmationModal from '../archive-board-confirmation-modal/ArchiveBoardConfirmationModal.vue';
import { Options, Vue } from 'vue-class-component';
import { Prop, ProvideReactive } from 'vue-property-decorator';
import CardView from '../card-view/CardView.vue';
import axios from 'axios';
import { Card, Label } from '@/dataStructures/card';
import { LabelContainer } from '@/dataStructures/label-container';
import router from '@/router';
import { DueDateLabelColor } from '@/dataStructures/dueDateLabel';
import draggable from 'vuedraggable';

@Options({
  components: {
    ListCreationModal,
    CardCreationModal,
    CardView,
    ArchiveBoardConfirmationModal,
    draggable
  },
  directives: {
    focus: {
      mounted (element: HTMLElement) {
        element.focus();
      }
    }
  }
})
export default class BoardView extends Vue {
  @Prop() boardId!: string;
  @ProvideReactive() card: Card = {
    title: '',
    description: '',
    id: 0,
    labels: [],
    dueDateComplete: false
  };

  @ProvideReactive() listId = 0;

  @ProvideReactive() labels: LabelContainer = {
    labels: []
  };

  public boardInfo: Board = {
    title: '',
    image: '',
    id: ''
  };

  public clickedListId = 0;
  public possibleVisibilities = BoardVisibility;
  public titleEditing = false;
  public editableTitle = '';
  public listEditing: Record<string, boolean> = {};
  public editableListTitle = '';
  public labelsVisible = false;

  public config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('jwt')
    },
    params: {}
  };

  mounted () {
    this.getBoardInfo();
  }

  getBoardInfo () {
    this.config.params = {
      id: this.boardId
    };
    axios.get(Environment.restServices + 'board', this.config)
      .then(res => {
        this.boardInfo = {
          title: res.data.name,
          image: Environment.publicPath + 'assets/basic.png',
          id: res.data.id,
          lists: [],
          visibility: res.data.private ? BoardVisibility.Private : BoardVisibility.Public,
          labels: res.data.labels
        };
        for (const listData of res.data.lists) {
          const items = [];
          for (const card of listData.cards) {
            let labels;
            if (card.labels == null) {
              labels = [];
            } else {
              labels = card.labels;
            }
            items.push({
              title: card.name,
              description: card.description,
              id: card.id,
              labels: labels,
              dueDate: new Date(card.deadline),
              dueDateComplete: false
            });
          }
          const list = {
            id: listData.id,
            title: listData.name,
            items: items
          };
          this.boardInfo.lists != null ? this.boardInfo.lists.push(list) : this.boardInfo.lists = [list];
        }
        this.labels.labels = this.boardInfo.labels as Array<Label>;
      });
  }

  handleListCreation (listName: string) {
    const requestBody = {
      name: listName,
      boardId: this.boardId
    };
    axios.post(Environment.restServices + 'list', requestBody, this.config)
      .then(() => this.getBoardInfo());
  }

  handleCardCreation (cardName: string) {
    const requestBody = {
      name: cardName,
      listId: this.clickedListId
    };
    axios.post(Environment.restServices + 'card', requestBody, this.config)
      .then(() => this.getBoardInfo());
  }

  openCardCreationModal (id: number) {
    this.clickedListId = id;
  }

  toggleBoardVisibility () {
    const makePrivate = this.boardInfo.visibility === BoardVisibility.Public;
    this.config.params = {
      id: this.boardId,
      makePrivate: makePrivate
    };
    axios.put(Environment.restServices + 'boardPrivacy', {}, this.config)
      .then(() => {
        switch (this.boardInfo.visibility) {
          case BoardVisibility.Private:
            this.boardInfo.visibility = BoardVisibility.Public;
            break;
          case BoardVisibility.Public:
            this.boardInfo.visibility = BoardVisibility.Private;
            break;
          default:
            break;
        }
      });
  }

  openCardView (listId: number, id: number) {
    // Get card info by id from rest api or extract it from table info
    const foundCard = this.boardInfo.lists?.find(list => list.id === listId)?.items?.find(card => card.id === id);
    if (foundCard != null) {
      this.card = foundCard;
      this.listId = listId;
    }
  }

  handleCardUpdate () {
    // Update card info in card lists
  }

  startTitleEditing () {
    this.titleEditing = true;
    this.editableTitle = this.boardInfo.title;
  }

  endTitleEditing () {
    this.titleEditing = false;
    this.config.params = {
      id: this.boardId,
      name: this.editableTitle
    };
    axios.put(Environment.restServices + 'boardName', {}, this.config)
      .then(() => {
        this.boardInfo.title = this.editableTitle;
      });
  }

  startListEditing (listToEdit: number) {
    const foundList = this.boardInfo.lists?.find(list => list.id === listToEdit);
    if (foundList != null) {
      this.listEditing[foundList.id.toString()] = true;
      // Only do following if update in rest api was successfull
      this.editableListTitle = foundList.title;
    }
  }

  endListEditing (listToEdit: number) {
    const foundList = this.boardInfo.lists?.find(list => list.id === listToEdit);
    if (foundList != null) {
      this.listEditing[foundList.id.toString()] = false;
      this.config.params = {
        id: foundList.id,
        name: this.editableListTitle
      };
      axios.put(Environment.restServices + 'listName', {}, this.config)
        .then(() => {
          foundList.title = this.editableListTitle;
        });
    }
  }

  toggleLabelVisibility () {
    this.labelsVisible = !this.labelsVisible;
  }

  archiveBoard () {
    this.config.params = {
      id: this.boardId,
      makeArchived: true
    };
    axios.put(Environment.restServices + 'boardArchive', {}, this.config)
      .then(() => {
        router.push('/boards');
      });
  }

  formatDueDateString (dateToFormat: Date) {
    const localeString = dateToFormat.toLocaleString('pl-PL', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    const dateParts = localeString.split(' ');
    return dateParts[0] + ' ' + dateParts[1] + (new Date().getFullYear() !== dateToFormat.getFullYear() ? ' ' + dateToFormat.getFullYear() : '');
  }

  getDueDateLabelColor (card: Card) {
    if (card.dueDate != null) {
      let color = DueDateLabelColor.None;
      const currentDate = new Date();
      currentDate.setSeconds(0, 0);
      const dateWarning = new Date(card.dueDate.getDate() - 2);
      if (card.dueDateComplete) {
        color = DueDateLabelColor.Complete;
      } else if (currentDate > card.dueDate) {
        color = DueDateLabelColor.Overdue;
      } else if (currentDate > dateWarning) {
        color = DueDateLabelColor.Soon;
      }
      console.log(color);
      return color;
    }
  }

  handleCreateLabel (label: Label) {
    const requestBody = {
      id: this.boardId,
      name: label.name,
      color: label.color
    };
    axios.post(Environment.restServices + 'label', requestBody, this.config)
      .then(response => {
        if (this.boardInfo.labels == null) {
          this.boardInfo.labels = [];
        }
        label.id = response.data;
        this.boardInfo.labels.push(label);
      });
  }

  handleEditLabel (label: Label) {
    const requestBody = {
      id: label.id,
      name: label.name,
      color: label.color
    };
    this.config.params = {};
    axios.put(Environment.restServices + 'label', requestBody, this.config)
      .then(() => {
        if (this.boardInfo.labels != null) {
          for (const labelInArray of this.boardInfo.labels) {
            if (labelInArray.id === label.id) {
              const index = this.boardInfo.labels.indexOf(labelInArray);
              if (index !== -1) {
                this.boardInfo.labels[index] = label;
                if (this.boardInfo.lists != null) {
                  for (const list of this.boardInfo.lists) {
                    if (list.items != null) {
                      for (const card of list.items) {
                        const labelId = card.labels.findIndex(l => l.id === label.id);
                        card.labels[labelId] = label;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });
  }

  handleDeleteLabel (label: Label) {
    this.config.params = {
      labelId: label.id
    };
    axios.delete(Environment.restServices + 'label', this.config)
      .then(() => {
        if (this.boardInfo.labels != null) {
          const index = this.boardInfo.labels.indexOf(label);
          if (index !== -1) {
            this.boardInfo.labels.splice(index, 1);
            if (this.boardInfo.lists != null) {
              for (const list of this.boardInfo.lists) {
                if (list.items != null) {
                  for (const card of list.items) {
                    if (card.labels.indexOf(label) !== -1) {
                      card.labels.splice(card.labels.indexOf(label), 1);
                    }
                  }
                }
              }
            }
          }
        }
      });
  }
};
