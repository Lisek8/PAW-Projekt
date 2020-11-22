import { Options, Vue } from 'vue-class-component';
import { Emit } from 'vue-property-decorator';

@Options({
  emits: [
    'archive-board'
  ]
})
export default class ArchiveBoardConfirmationModal extends Vue {
  @Emit('archive-board')
  archiveBoard () {
    // Sends event to parent component
  }
};
