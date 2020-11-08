import axios from 'axios';
import { Environment } from './../../../env.config.js';

export default {
  name: 'Content',
  msg: '',
  data () {
    return {
      msg: ''
    };
  },
  created () {
    axios.get(Environment.restServices + 'hello')
      .then(res => {
        this.msg = res.data;
      })
      .catch(err => console.log(err));
  }
};
