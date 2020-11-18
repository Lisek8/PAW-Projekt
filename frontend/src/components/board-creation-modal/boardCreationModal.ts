import { Options, Vue } from 'vue-class-component';
import { Emit, InjectReactive } from 'vue-property-decorator';

@Options({
  emits: [
    'update:isVisible',
    'update:boardName',
    'create-board'
  ]
})
export default class BoardCreationModal extends Vue {
  @InjectReactive() isVisible = false;
  public boardName = '';

  @Emit('update:isVisible')
  validateAndClose () {
    this.$emit('create-board', this.boardName);
    this.boardName = '';
    return false;
  }
};
