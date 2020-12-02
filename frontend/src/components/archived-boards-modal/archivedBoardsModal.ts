import { Board } from '@/dataStructures/board';
import { Environment } from '../../../env.config';
import { Vue } from 'vue-class-component';
import axios from 'axios';
import { InjectReactive } from 'vue-property-decorator';

export default class ArchivedBoardsModal extends Vue {
  public archivedBoards: Board[] = [];
  @InjectReactive() privateBoards !: Board[];
  public boardInfo: Board = {
    title: '',
    image: '',
    id: ''
  };

  public config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('jwt')
    },
    params: {}
  };

  mounted () {
    this.config.params = {
      archived: true
    };
    axios.get(Environment.restServices + 'boards', this.config)
      .then(res => {
        for (const backendBoard of res.data) {
          const board = {
            title: backendBoard.name,
            image: Environment.publicPath + 'assets/basic.png',
            id: backendBoard.id
          };
          this.archivedBoards.push(board);
        }
      });
  }

  deleteBoard (id: string) {
    this.config.params = {
      id: id
    };
    axios.delete(Environment.restServices + 'board', this.config)
      .then(() => {
        this.archivedBoards = this.archivedBoards.filter(board => board.id !== id);
      });
  }

  restoreBoard (id: string) {
    this.config.params = {
      id: id,
      makeArchived: false
    };
    axios.put(Environment.restServices + 'boardArchive', {}, this.config)
      .then(() => {
        this.archivedBoards = this.archivedBoards.filter(board => board.id !== id);
        axios.get(Environment.restServices + 'board', this.config)
          .then(res => {
            this.privateBoards.push({
              title: res.data.name,
              image: Environment.publicPath + 'assets/basic.png',
              id: res.data.id
            });
          });
      });
  }
};
