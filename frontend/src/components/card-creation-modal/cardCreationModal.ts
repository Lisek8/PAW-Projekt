import { Options, Vue } from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';

@Options({
  emits: [
    'update:isVisible',
    'update:cardName',
    'create-card'
  ]
})
export default class CardCreationModal extends Vue {
  @Prop() isVisible = false;
  cardName = '';

  @Emit('update:isVisible')
  validateAndClose () {
    this.$emit('create-card', this.cardName);
    this.cardName = '';
    return false;
  }
};
