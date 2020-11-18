import { Environment } from './../../../env.config.js';
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
import router from '@/router';
import { vModelCheckbox } from 'vue';

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
        window.location.reload();
        this.loginFailure = false;
      })
      .catch(() => { this.loginFailure = true; });
    router.push('/');
  }
};
