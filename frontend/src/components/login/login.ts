import { Ref, ref } from 'vue';
import { Vue } from 'vue-class-component';

export default class Login extends Vue {
  loginFailure = false;
  loginName = '';
  loginPassword = '';

  changeStatus () {
    // Implement proper login procedure here
    this.loginFailure = !this.loginFailure;
  };
};
