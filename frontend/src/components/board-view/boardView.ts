import { Board } from '@/dataStructures/board';
import { Environment } from './../../../env.config';
import ListCreationModal from '../list-creation-modal/ListCreationModal.vue';
import CardCreationModal from '../card-creation-modal/CardCreationModal.vue';
import { Options, Vue } from 'vue-class-component';
import { ProvideReactive } from 'vue-property-decorator';

@Options({
  components: {
    ListCreationModal,
    CardCreationModal
  }
})
export default class BoardView extends Vue {
  @ProvideReactive() showListCreationModal = false;
  @ProvideReactive() showCardCreationModal = false;
  boardInfo: Board = {
    title: '',
    image: '',
    id: ''
  };

  mounted () {
    // Get this from backend
    this.getBoardInfo();
  }

  getBoardInfo () {
    // Get this from backend
    this.boardInfo = {
      title: 'TEST',
      image: Environment.publicPath + 'assets/basic.png',
      id: 'TEST',
      lists: [
        {
          title: 'Test list1',
          items: [
            {
              title: 'Card 1',
              description: '',
              id: ''
            },
            {
              title: 'Card 2',
              description: '',
              id: ''
            },
            {
              title: 'Card 3',
              description: '',
              id: ''
            },
            {
              title: 'Card 4',
              description: '',
              id: ''
            },
            {
              title: 'Card 5',
              description: '',
              id: ''
            },
            {
              title: 'Card 6',
              description: '',
              id: ''
            },
            {
              title: 'Card 7',
              description: '',
              id: ''
            },
            {
              title: 'Card 8',
              description: '',
              id: ''
            },
            {
              title: 'Card 9',
              description: '',
              id: ''
            },
            {
              title: 'Card 9',
              description: '',
              id: ''
            },
            {
              title: 'Card 9',
              description: '',
              id: ''
            },
            {
              title: 'Card 9',
              description: '',
              id: ''
            },
            {
              title: 'Card 9',
              description: '',
              id: ''
            },
            {
              title: 'Card 9',
              description: '',
              id: ''
            },
            {
              title: 'Card 9',
              description: '',
              id: ''
            },
            {
              title: 'Card 9',
              description: '',
              id: ''
            },
            {
              title: 'Card 9',
              description: '',
              id: ''
            },
            {
              title: 'Card 9',
              description: '',
              id: ''
            },
            {
              title: 'Card 9',
              description: '',
              id: ''
            }
          ]
        },
        {
          title: 'Test list2',
          items: [
            {
              title: 'Card 1',
              description: '',
              id: ''
            },
            {
              title: 'Card 2',
              description: '',
              id: ''
            },
            {
              title: 'Card 3',
              description: '',
              id: ''
            },
            {
              title: 'Card 4',
              description: '',
              id: ''
            },
            {
              title: 'Card 5',
              description: '',
              id: ''
            },
            {
              title: 'Card 6',
              description: '',
              id: ''
            },
            {
              title: 'Card 7',
              description: '',
              id: ''
            },
            {
              title: 'Card 8',
              description: '',
              id: ''
            },
            {
              title: 'Card 9',
              description: '',
              id: ''
            }
          ]
        },
        {
          title: 'Test list3',
          items: [
            {
              title: 'Card 1',
              description: '',
              id: ''
            },
            {
              title: 'Card 2',
              description: '',
              id: ''
            },
            {
              title: 'Card 3',
              description: '',
              id: ''
            },
            {
              title: 'Card 4',
              description: '',
              id: ''
            },
            {
              title: 'Card 5',
              description: '',
              id: ''
            },
            {
              title: 'Card 6',
              description: '',
              id: ''
            },
            {
              title: 'Card 7',
              description: '',
              id: ''
            },
            {
              title: 'Card 8',
              description: '',
              id: ''
            },
            {
              title: 'Card 9',
              description: '',
              id: ''
            }
          ]
        },
        {
          title: 'Test list4',
          items: [
            {
              title: 'Card 1',
              description: '',
              id: ''
            },
            {
              title: 'Card 2',
              description: '',
              id: ''
            },
            {
              title: 'Card 3',
              description: '',
              id: ''
            },
            {
              title: 'Card 4',
              description: '',
              id: ''
            },
            {
              title: 'Card 5',
              description: '',
              id: ''
            },
            {
              title: 'Card 6',
              description: '',
              id: ''
            },
            {
              title: 'Card 7',
              description: '',
              id: ''
            },
            {
              title: 'Card 8',
              description: '',
              id: ''
            },
            {
              title: 'Card 9',
              description: '',
              id: ''
            }
          ]
        },
        {
          title: 'Test list5',
          items: [
            {
              title: 'Card 1',
              description: '',
              id: ''
            },
            {
              title: 'Card 2',
              description: '',
              id: ''
            },
            {
              title: 'Card 3',
              description: '',
              id: ''
            },
            {
              title: 'Card 4',
              description: '',
              id: ''
            },
            {
              title: 'Card 5',
              description: '',
              id: ''
            },
            {
              title: 'Card 6',
              description: '',
              id: ''
            },
            {
              title: 'Card 7',
              description: '',
              id: ''
            },
            {
              title: 'Card 8',
              description: '',
              id: ''
            },
            {
              title: 'Card 9',
              description: '',
              id: ''
            }
          ]
        },
        {
          title: 'Test list6',
          items: [
            {
              title: 'Card 1',
              description: '',
              id: ''
            },
            {
              title: 'Card 2',
              description: '',
              id: ''
            },
            {
              title: 'Card 3',
              description: '',
              id: ''
            },
            {
              title: 'Card 4',
              description: '',
              id: ''
            },
            {
              title: 'Card 5',
              description: '',
              id: ''
            },
            {
              title: 'Card 6',
              description: '',
              id: ''
            },
            {
              title: 'Card 7',
              description: '',
              id: ''
            },
            {
              title: 'Card 8',
              description: '',
              id: ''
            },
            {
              title: 'Card 9',
              description: '',
              id: ''
            }
          ]
        },
        {
          title: 'Test list7',
          items: [
            {
              title: 'Card 1',
              description: '',
              id: ''
            },
            {
              title: 'Card 2',
              description: '',
              id: ''
            },
            {
              title: 'Card 3',
              description: '',
              id: ''
            },
            {
              title: 'Card 4',
              description: '',
              id: ''
            },
            {
              title: 'Card 5',
              description: '',
              id: ''
            },
            {
              title: 'Card 6',
              description: '',
              id: ''
            },
            {
              title: 'Card 7',
              description: '',
              id: ''
            },
            {
              title: 'Card 8',
              description: '',
              id: ''
            },
            {
              title: 'Card 9',
              description: '',
              id: ''
            }
          ]
        },
        {
          title: 'Test list8',
          items: [
            {
              title: 'Card 1',
              description: '',
              id: ''
            },
            {
              title: 'Card 2',
              description: '',
              id: ''
            },
            {
              title: 'Card 3',
              description: '',
              id: ''
            },
            {
              title: 'Card 4',
              description: '',
              id: ''
            },
            {
              title: 'Card 5',
              description: '',
              id: ''
            },
            {
              title: 'Card 6',
              description: '',
              id: ''
            },
            {
              title: 'Card 7',
              description: '',
              id: ''
            },
            {
              title: 'Card 8',
              description: '',
              id: ''
            },
            {
              title: 'Card 9',
              description: '',
              id: ''
            }
          ]
        },
        {
          title: 'Test list9',
          items: [
            {
              title: 'Card 1',
              description: '',
              id: ''
            },
            {
              title: 'Card 2',
              description: '',
              id: ''
            },
            {
              title: 'Card 3',
              description: '',
              id: ''
            },
            {
              title: 'Card 4',
              description: '',
              id: ''
            },
            {
              title: 'Card 5',
              description: '',
              id: ''
            },
            {
              title: 'Card 6',
              description: '',
              id: ''
            },
            {
              title: 'Card 7',
              description: '',
              id: ''
            },
            {
              title: 'Card 8',
              description: '',
              id: ''
            },
            {
              title: 'Card 9',
              description: '',
              id: ''
            }
          ]
        }
      ]
    };
  }

  handleListCreation (listName: string) {
    // Handle list creation here
  }

  handleCardCreation (cardName: string) {
    // Handle card creation here
  }

  openListCreationModal () {
    this.showListCreationModal = true;
  }

  openCardCreationModal () {
    this.showCardCreationModal = true;
  }
};
