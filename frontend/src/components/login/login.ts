import { Ref, ref } from 'vue';

export default {
  name: 'Login',
  setup () {
    const loginFailure: Ref<boolean> = ref(false);
    const loginName: Ref<string> = ref('');
    const loginPassword: Ref<string> = ref('');

    function changeStatus () {
      // Implement proper login procedure here
      loginFailure.value = !loginFailure.value;
    }

    return { loginFailure, loginName, loginPassword, changeStatus };
  }
};
