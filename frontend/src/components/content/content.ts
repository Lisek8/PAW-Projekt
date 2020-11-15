import axios from 'axios';
import { Vue } from 'vue-class-component';
import { Environment } from './../../../env.config.js';

export default class Content extends Vue {
  msg = '';

  created () {
    axios.get(Environment.restServices + 'hello')
      .then(response => {
        this.msg = response.data;
      })
      .catch(error => console.error(error));
  };
};
