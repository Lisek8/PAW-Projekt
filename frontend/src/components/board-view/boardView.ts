import { Board } from '@/dataStructures/board';
import { defineComponent, Ref, ref } from 'vue';
import { Environment } from './../../../env.config';
import ListCreationModal from '../list-creation-modal/ListCreationModal.vue';
import CardCreationModal from '../card-creation-modal/CardCreationModal.vue';

export default defineComponent({
  name: 'BoardView',
  components: {
    ListCreationModal,
    CardCreationModal
  },
  methods: {
    getBoardInfo: function getBoardInfo () {
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
    },
    handleListCreation: function handleListCreation (listName: string) {
      // Handle list creation here
    },
    handleCardCreation: function handleCardCreation (cardName: string) {
      // Handle card creation here
    },
    openListCreationModal: function openListCreationModal () {
      this.showListCreationModal = true;
    },
    openCardCreationModal: function openCardCreationModal () {
      this.showCardCreationModal = true;
    }
  },
  setup () {
    const showListCreationModal: Ref<boolean> = ref(false);
    const showCardCreationModal: Ref<boolean> = ref(false);
    const boardInfo: Ref<Board> = ref({
      title: '',
      image: '',
      id: ''
    });

    return { boardInfo, showListCreationModal, showCardCreationModal };
  },
  mounted: function () {
    this.getBoardInfo();
  }
});