import { Board, BoardVisibility } from '@/dataStructures/board';
import { Environment } from './../../../env.config';
import ListCreationModal from '../list-creation-modal/ListCreationModal.vue';
import CardCreationModal from '../card-creation-modal/CardCreationModal.vue';
import { Options, Vue } from 'vue-class-component';
import { Prop, ProvideReactive } from 'vue-property-decorator';
import axios from 'axios';

@Options({
  components: {
    ListCreationModal,
    CardCreationModal
  }
})
export default class BoardView extends Vue {
  @ProvideReactive() showListCreationModal = false;
  @ProvideReactive() showCardCreationModal = false;
  @Prop() boardId: string | undefined;

  public boardInfo: Board = {
    title: '',
    image: '',
    id: ''
  };

  public clickedListId = 0;
  public possibleVisibilities = BoardVisibility;

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
          visibility: BoardVisibility.Public
        };
        for (const listData of res.data.lists) {
          const items = [];
          for (const card of listData.cards) {
            items.push({
              title: card.name,
              description: card.description,
              id: card.id
            });
          }
          const list = {
            id: listData.id,
            title: listData.name,
            items: items
          };
          this.boardInfo.lists != null ? this.boardInfo.lists.push(list) : this.boardInfo.lists = [list];
        }
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

  openListCreationModal () {
    this.showListCreationModal = true;
  }

  openCardCreationModal (id: number) {
    this.clickedListId = id;
    this.showCardCreationModal = true;
  }

  toggleBoardVisibility () {
    // Send request to restAPI to change visibility
    // If successfull request again board data or only visibility depending on the implementation in rest api
    // Delete following once implemented
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
  }
};
