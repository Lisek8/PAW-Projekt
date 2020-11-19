import { Board } from '@/dataStructures/board';
import { Environment } from './../../../env.config';
import ListCreationModal from '../list-creation-modal/ListCreationModal.vue';
import CardCreationModal from '../card-creation-modal/CardCreationModal.vue';
import { Options, Vue } from 'vue-class-component';
import { Prop, ProvideReactive } from 'vue-property-decorator';
import axios from 'axios';
import router from '@/router';

@Options({
  components: {
    ListCreationModal,
    CardCreationModal
  }
})
export default class BoardView extends Vue {
  @ProvideReactive() showListCreationModal = false;
  @ProvideReactive() showCardCreationModal = false;
  public boardInfo: Board = {
    title: '',
    image: '',
    id: ''
  };

  public clickedListId = 0;

  @Prop()
  boardId: string | undefined | number

  public items = [
    {
      title: 'Card 1',
      description: '',
      id: ''
    },
    {
      title: 'Card 2',
      description: '',
      id: ''
    }
  ]

  public config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('jwt')
    }
  };

  mounted () {
    this.getBoardInfo();
  }

  getBoardInfo () {
    axios.get(Environment.restServices + 'board?id=' + this.boardId, this.config)
      .then(res => {
        const lists2 = [];
        for (let i = 0; i < res.data.lists.length; i++) {
          const items2 = [];
          for (let j = 0; j < res.data.lists[i].cards.length; j++) {
            const item = {
              title: res.data.lists[i].cards[j].name,
              description: res.data.lists[i].cards[j].description,
              id: res.data.lists[i].cards[j].id
            };
            items2.push(item);
          }
          const list = {
            id: res.data.lists[i].id,
            title: res.data.lists[i].name,
            items: items2
          };
          lists2.push(list);
        }
        this.boardInfo = {
          title: res.data.name,
          image: Environment.publicPath + 'assets/basic.png',
          id: res.data.id,
          lists: lists2
        };
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
};
