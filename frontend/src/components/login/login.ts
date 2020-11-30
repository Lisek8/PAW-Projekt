import { Environment } from './../../../env.config.js';
import { Vue } from 'vue-class-component';
import axios from 'axios';
import router from '@/router';

export default class Login extends Vue {
  public loginFailure = false;
  public loginName = '';
  public loginPassword = '';

  changeStatus () {
    const requestBody = {
      email: this.loginName,
      password: this.loginPassword
    };
    axios.post(Environment.restServices + 'login', requestBody)
      .then(res => {
        localStorage.setItem('jwt', res.data.jwt);
        localStorage.setItem('loggedIn', 'true');
        this.loginFailure = false;
        router.push('/').then(() => { window.location.reload(); });
      })
      .catch(() => { this.loginFailure = true; });
  }
};
