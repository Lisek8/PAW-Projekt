import router from '@/router';
import { Options, Vue } from 'vue-class-component';
import { ProvideReactive } from 'vue-property-decorator';
import BoardCreationModal from '../board-creation-modal/BoardCreationModal.vue';
import axios from 'axios';
import { Environment } from './../../../env.config';

@Options({
  components: {
    BoardCreationModal
  }
})
export default class Menu extends Vue {
  @ProvideReactive() showBoardCreationModal = false;
  public loggedIn = localStorage.getItem('loggedIn') === 'true';
  public config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('jwt')
    }
  };

  logout () {
    axios.get(Environment.restServices + 'logout', this.config)
      .then(() => {
        this.loggedIn = false;
      });
    this.loggedIn = false;
    localStorage.setItem('loggedIn', 'false');
    router.push('/');
  }

  openBoardCreationModal () {
    this.showBoardCreationModal = true;
  }

  handleBoardCreation (boardName: string) {
    const requestBody = {
      name: boardName,
      isPrivate: true
    };
    axios.post(Environment.restServices + 'board?name=' + boardName + '&' + 'isPrivate=' + 'true', requestBody, this.config)
      .then(() => {
        router.push('/boards');
      });
  }
};
