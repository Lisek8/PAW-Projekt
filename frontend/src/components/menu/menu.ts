import router from '@/router';
import { Ref, ref } from 'vue';

export default {
  name: 'Menu',
  setup () {
    const loggedIn: Ref<boolean> = ref(true);

    function logout () {
      // Implement proper logout procedure here
      loggedIn.value = false;
      router.push('/');
    }

    return { loggedIn, logout };
  }
};
