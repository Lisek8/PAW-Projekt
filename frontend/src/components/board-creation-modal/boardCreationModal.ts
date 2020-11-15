import { Options, Vue } from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';

@Options({
  emits: [
    'update:isVisible',
    'update:boardName',
    'create-board'
  ]
})
export default class BoardCreationModal extends Vue {
  @Prop() isVisible = false;
  boardName = '';

  @Emit('update:isVisible')
  validateAndClose () {
    this.$emit('create-board', this.boardName);
    this.boardName = '';
    return false;
  }
};
