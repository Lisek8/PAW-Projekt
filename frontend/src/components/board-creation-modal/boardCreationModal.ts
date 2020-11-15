import { defineComponent, Ref, ref } from 'vue';

export default defineComponent({
  name: 'BoardCreationModal',
  props: {
    isVisible: Boolean
  },
  emits: [
    'update:isVisible',
    'update:boardName',
    'create-board'
  ],
  setup () {
    const boardName: Ref<string> = ref('');

    return { boardName };
  },
  methods: {
    validateAndClose: function validateAndClose () {
      this.$emit('update:isVisible', false);
      this.$emit('create-board', this.boardName);
      this.boardName = '';
    }
  }
});
