import { Card } from '@/dataStructures/card';
import { LabelContainer } from '@/dataStructures/label-container';
import { Options, Vue } from 'vue-class-component';
import { Emit, InjectReactive } from 'vue-property-decorator';

@Options({
  emits: [
    'update:card',
    'card-update'
  ],
  directives: {
    focus: {
      mounted (element: HTMLElement) {
        element.focus();
      }
    }
  }
})
export default class CardView extends Vue {
  @InjectReactive() card !: Card;
  @InjectReactive() labels !: LabelContainer;
  public editingDescription = false;
  public editableDescription = '';

  @Emit('card-update')
  updateCard () {
    // Communicate with rest api
    // Execute following code only if request was successfull if not display error message
    this.$emit('update:card', this.card);
  }

  enableDescriptionEditing () {
    this.editableDescription = this.card.description;
    this.editingDescription = true;
  }

  disableDescriptionEditing (save: boolean) {
    if (save) {
      this.card.description = this.editableDescription;
    }
    this.editingDescription = false;
  }

  @Emit('card-update')
  toggleCardLabel (id: number) {
    const appliedLabel = this.card.labels.find(label => label.id === id);
    if (appliedLabel != null) {
      this.card.labels = this.card.labels.filter(label => label.id !== id);
    } else {
      const labelToAdd = this.labels.labels.find(label => label.id === id);
      if (labelToAdd != null) {
        this.card.labels.push(labelToAdd);
        this.card.labels = this.card.labels.sort((labelFirst, labelSecond) => labelFirst.id - labelSecond.id);
      }
    }
  }

  isLabelApplied (id: number) {
    return this.card.labels.find(label => label.id === id) != null;
  }
};
