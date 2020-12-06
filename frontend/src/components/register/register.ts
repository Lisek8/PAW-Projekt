import { Vue } from 'vue-class-component';

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
    // Validation and communication with backend with proper error handling and proper redirect on success
    this.registerFailure = !this.registerFailure;
  }
};
