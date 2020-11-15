import { defineComponent, Ref, ref } from 'vue';

export default defineComponent({
  name: 'CardCreationModal',
  props: {
    isVisible: Boolean
  },
  emits: [
    'update:isVisible',
    'update:cardName',
    'create-card'
  ],
  setup () {
    const cardName: Ref<string> = ref('');

    return { cardName };
  },
  methods: {
    validateAndClose: function validateAndClose () {
      this.$emit('update:isVisible', false);
      this.$emit('create-card', this.cardName);
      this.cardName = '';
    }
  }
});
