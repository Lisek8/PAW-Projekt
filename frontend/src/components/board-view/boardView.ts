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

@Options({
  components: {
    ListCreationModal,
    CardCreationModal,
    CardView,
    ArchiveBoardConfirmationModal
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
    labels: []
  };

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
          labels: [
            {
              id: 0,
              name: 'Banan',
              color: '#fcba03'
            },
            {
              id: 1,
              name: 'Jabłko',
              color: '#62CA39'
            }
          ]
        };
        for (const listData of res.data.lists) {
          const items = [];
          for (const card of listData.cards) {
            items.push({
              title: card.name,
              description: card.description,
              id: card.id,
              labels: [
                {
                  id: 0,
                  name: 'Banan',
                  color: '#fcba03'
                },
                {
                  id: 1,
                  name: 'Jabłko',
                  color: '#62CA39'
                }
              ]
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
    const requstBody = {
      id: this.boardId,
      name: this.editableTitle
    };
    axios.put(Environment.restServices + 'boardName', requstBody, this.config)
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
      // Only do following if update in rest api was successfull
      foundList.title = this.editableListTitle;
    }
  }

  toggleLabelVisibility () {
    this.labelsVisible = !this.labelsVisible;
  }

  archiveBoard () {
    // Handle board archiving here
  }
};
