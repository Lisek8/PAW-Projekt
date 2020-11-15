import { Board } from '@/dataStructures/board';
import { defineComponent, Ref, ref } from 'vue';
import { Environment } from './../../../env.config';

export default defineComponent({
  name: 'BoardView',
  methods: {
    getBoardInfo: function getBoardInfo () {
      // Get this from backend
      this.boardInfo = {
        title: 'TEST',
        image: Environment.publicPath + 'assets/basic.png',
        id: 'TEST'
      };
    }
  },
  setup () {
    const boardInfo: Ref<Board> = ref({
      title: '',
      image: '',
      id: ''
    });

    return { boardInfo };
  },
  mounted: function () {
    this.getBoardInfo();
  }
});
