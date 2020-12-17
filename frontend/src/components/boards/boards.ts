import { Board } from '@/dataStructures/board';
import { Environment } from './../../../env.config';
import { Options, Vue } from 'vue-class-component';
import ArchivedBoardsModal from '../archived-boards-modal/ArchivedBoardsModal.vue';
import axios from 'axios';
import { ProvideReactive } from 'vue-property-decorator';

@Options({
  components: {
    ArchivedBoardsModal
  }
})
export default class Boards extends Vue {
  @ProvideReactive() privateBoards: Board[] = [];

  mounted () {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      },
      params: {
        archived: false
      }
    };
    axios.get(Environment.restServices + 'boards', config)
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          const board = {
            title: res.data[i].name,
            image: Environment.publicPath + 'assets/basicPreview.png',
            id: res.data[i].id
          };
          this.privateBoards.push(board);
        }
      });
  };
};
