import { Board } from '@/dataStructures/board';
import { defineComponent, Ref, ref } from 'vue';
import { Environment } from './../../../env.config';
import ListCreationModal from '../list-creation-modal/ListCreationModal.vue';

export default defineComponent({
  name: 'BoardView',
  components: {
    ListCreationModal
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
            title: 'Test list'
          },
          {
            title: 'Test list'
          },
          {
            title: 'Test list'
          },
          {
            title: 'Test list'
          },
          {
            title: 'Test list'
          },
          {
            title: 'Test list'
          },
          {
            title: 'Test list'
          },
          {
            title: 'Test list'
          },
          {
            title: 'Test list'
          }
        ]
      };
    },
    handleListCreation: function handleListCreation (listName: string) {
      // Handle list creation here
    },
    openListCreationModal: function openListCreationModal () {
      this.showListCreationModal = true;
    }
  },
  setup () {
    const showListCreationModal: Ref<boolean> = ref(false);
    const boardInfo: Ref<Board> = ref({
      title: '',
      image: '',
      id: ''
    });

    return { boardInfo, showListCreationModal };
  },
  mounted: function () {
    this.getBoardInfo();
  }
});
