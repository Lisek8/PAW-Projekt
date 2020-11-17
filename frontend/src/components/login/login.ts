import { Vue } from 'vue-class-component';

export default class Login extends Vue {
  public loginFailure = false;
  public loginName = '';
  public loginPassword = '';

  changeStatus () {
    // Implement proper login procedure here
    this.loginFailure = !this.loginFailure;
  };
};
