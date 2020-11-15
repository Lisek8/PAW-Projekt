import router from '@/router';
import { Options, Vue } from 'vue-class-component';
import { ProvideReactive } from 'vue-property-decorator';
import BoardCreationModal from '../board-creation-modal/BoardCreationModal.vue';

@Options({
  components: {
    BoardCreationModal
  }
})
export default class Menu extends Vue {
  @ProvideReactive() showBoardCreationModal = false;
  public loggedIn = true;

  logout () {
    // Implement proper logout procedure here
    this.loggedIn = false;
    router.push('/');
  }

  openBoardCreationModal () {
    this.showBoardCreationModal = true;
  }

  handleBoardCreation (boardName: string) {
    // Handle board creation here
  };
};
