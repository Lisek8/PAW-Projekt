import { Board } from '@/dataStructures/board';
import { Environment } from './../../../env.config';
import { Vue } from 'vue-class-component';
import axios from 'axios';

export default class Boards extends Vue {
  public recentlyViewed: Board[] = [];
  public privateBoards: Board[] = [];

  mounted () {
    // Get them from backend
    this.recentlyViewed.push(
      {
        title: 'Test0',
        image: Environment.publicPath + 'assets/basic.png',
        id: 'Test0'
      },
      {
        title: 'Test1',
        image: Environment.publicPath + 'assets/basic.png',
        id: 'Test1'
      },
      {
        title: 'Test2',
        image: Environment.publicPath + 'assets/basic.png',
        id: 'Test2'
      },
      {
        title: 'Test3',
        image: Environment.publicPath + 'assets/basic.png',
        id: 'Test3'
      },
      {
        title: 'Test4',
        image: Environment.publicPath + 'assets/basic.png',
        id: 'Test4'
      },
      {
        title: 'Test5',
        image: Environment.publicPath + 'assets/basic.png',
        id: 'Test5'
      },
      {
        title: 'Test6',
        image: Environment.publicPath + 'assets/basic.png',
        id: 'Test6'
      },
      {
        title: 'Test7',
        image: Environment.publicPath + 'assets/basic.png',
        id: 'Test7'
      },
      {
        title: 'Test8',
        image: Environment.publicPath + 'assets/basic.png',
        id: 'Test8'
      },
      {
        title: 'Test9',
        image: Environment.publicPath + 'assets/basic.png',
        id: 'Test9'
      }
    );
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }
    };
    axios.get(Environment.restServices + 'boards', config)
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          const board = {
            title: res.data[i].name,
            image: Environment.publicPath + 'assets/basic.png',
            id: res.data[i].id
          };
          this.privateBoards.push(board);
        }
      });
  };
};
