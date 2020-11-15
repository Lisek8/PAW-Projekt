import { Options, Vue } from 'vue-class-component';
import { Emit, InjectReactive } from 'vue-property-decorator';

@Options({
  emits: [
    'update:isVisible',
    'update:cardName',
    'create-card'
  ]
})
export default class CardCreationModal extends Vue {
  @InjectReactive() isVisible !: boolean;
  cardName = '';

  @Emit('update:isVisible')
  validateAndClose () {
    this.$emit('create-card', this.cardName);
    this.cardName = '';
    return false;
  }
};
