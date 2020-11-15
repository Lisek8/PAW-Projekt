import router from '@/router';
import { Options, Vue } from 'vue-class-component';
import BoardCreationModal from '../board-creation-modal/BoardCreationModal.vue';

@Options({
  components: {
    BoardCreationModal
  }
})
export default class Menu extends Vue {
  public loggedIn = true;
  public showModal = false;

  logout () {
    // Implement proper logout procedure here
    this.loggedIn = false;
    router.push('/');
  }

  openBoardCreationModal () {
    this.showModal = true;
  }

  handleBoardCreation (boardName: string) {
    // Handle board creation here
  };
};
