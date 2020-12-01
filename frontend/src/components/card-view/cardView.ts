import { Card } from '@/dataStructures/card';
import { LabelContainer } from '@/dataStructures/label-container';
import axios from 'axios';
import { Options, Vue } from 'vue-class-component';
import { Emit, InjectReactive } from 'vue-property-decorator';
import { Environment } from './../../../env.config';

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
  @InjectReactive() listId !: number;
  @InjectReactive() labels !: LabelContainer;
  public editingDescription = false;
  public editableDescription = '';
  public config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('jwt')
    },
    params: {}
  };

  @Emit('card-update')
  updateCard () {
    const requestBody = {
      name: this.card.title,
      description: this.card.description,
      isArchived: false,
      deadline: '2020-12-11',
      listId: this.listId
    };
    this.config.params = {
      id: this.card.id
    };
    axios.put(Environment.restServices + 'card', requestBody, this.config)
      .then(() => this.$emit('update:card', this.card));
  }

  enableDescriptionEditing () {
    this.editableDescription = this.card.description;
    this.editingDescription = true;
  }

  disableDescriptionEditing (save: boolean) {
    if (save) {
      this.card.description = this.editableDescription;
      this.updateCard();
    }
    this.editingDescription = false;
  }

  @Emit('card-update')
  toggleCardLabel (id: number) {
    const appliedLabel = this.card.labels.find(label => label.id === id);
    if (appliedLabel != null) {
      this.config.params = {
        labelId: id,
        cardId: this.card.id
      };
      axios.delete(Environment.restServices + 'cardLabel', this.config)
        .then(() => {
          // console.log(this.config.params);
          this.card.labels = this.card.labels.filter(label => label.id !== id);
        });
    } else {
      const labelToAdd = this.labels.labels.find(label => label.id === id);
      if (labelToAdd != null) {
        this.config.params = {
          labelId: labelToAdd.id,
          cardId: this.card.id
        };
        axios.post(Environment.restServices + 'cardLabel', {}, this.config)
          .then(() => {
            // console.log(this.config.params);
            this.card.labels.push(labelToAdd);
            this.card.labels = this.card.labels.sort((labelFirst, labelSecond) => labelFirst.id - labelSecond.id);
          });
      }
    }
  }

  isLabelApplied (id: number) {
    return this.card.labels.find(label => label.id === id) != null;
  }
};
