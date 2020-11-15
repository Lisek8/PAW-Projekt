import router from '@/router';
import { Ref, ref } from 'vue';
import BoardCreationModal from '../board-creation-modal/BoardCreationModal.vue';

export default {
  name: 'Menu',
  components: {
    BoardCreationModal
  },
  setup () {
    const loggedIn: Ref<boolean> = ref(true);
    const showModal: Ref<boolean> = ref(false);

    function logout () {
      // Implement proper logout procedure here
      loggedIn.value = false;
      router.push('/');
    }

    function openBoardCreationModal () {
      showModal.value = true;
    }

    function handleBoardCreation (boardName: string) {
      // Handle board creation here
    }

    return { loggedIn, logout, showModal, openBoardCreationModal, handleBoardCreation };
  }
};
