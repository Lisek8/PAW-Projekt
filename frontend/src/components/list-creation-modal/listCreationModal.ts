import { Options, Vue } from 'vue-class-component';
import { Emit } from 'vue-property-decorator';

@Options({
  emits: [
    'update:isVisible',
    'update:listName',
    'create-list'
  ]
})
export default class ListCreationModal extends Vue {
  public listName = '';

  @Emit('update:isVisible')
  validateAndClose () {
    this.$emit('create-list', this.listName);
    this.listName = '';
    return false;
  };
};
