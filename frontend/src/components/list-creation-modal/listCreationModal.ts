import { defineComponent, Ref, ref } from 'vue';

export default defineComponent({
  name: 'ListCreationModal',
  props: {
    isVisible: Boolean
  },
  emits: [
    'update:isVisible',
    'update:listName',
    'create-list'
  ],
  setup () {
    const listName: Ref<string> = ref('');

    return { listName };
  },
  methods: {
    validateAndClose: function validateAndClose () {
      this.$emit('update:isVisible', false);
      this.$emit('create-list', this.listName);
      this.listName = '';
    }
  }
});
