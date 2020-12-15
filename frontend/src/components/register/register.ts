import { Vue } from 'vue-class-component';
import axios from 'axios';
import { Environment } from './../../../env.config.js';
import router from '@/router';

export default class Register extends Vue {
  public registerFailure = false;
  public registerName = '';
  public registerPassword = '';
  public registerPasswordSecondary = '';
  public passwordsDoNotMatch = false;

  register () {
    if (this.registerPassword !== this.registerPasswordSecondary) {
      this.passwordsDoNotMatch = true;
      return;
    }
    this.passwordsDoNotMatch = false;
    const requestBody = {
      email: this.registerName,
      password: this.registerPassword,
      name: ''
    };
    axios.post(Environment.restServices + 'register', requestBody)
      .then(res => {
        router.push('/login');
        this.registerFailure = false;
      })
      .catch(() => { this.registerFailure = true; });
  }
};
