import { Card, Label } from '@/dataStructures/card';
import { LabelContainer } from '@/dataStructures/label-container';
import axios from 'axios';
import { Options, Vue } from 'vue-class-component';
import { Emit, InjectReactive } from 'vue-property-decorator';
import { Environment } from './../../../env.config';
import Datepicker from 'vue3-datepicker';
import { pl } from 'date-fns/esm/locale';
import { DueDateLabel, DueDateLabelColor } from '@/dataStructures/dueDateLabel';

@Options({
  emits: [
    'update:card',
    'card-update',
    'create-label',
    'edit-label',
    'delete-label'
  ],
  directives: {
    focus: {
      mounted (element: HTMLElement) {
        element.focus();
      }
    }
  },
  components: {
    Datepicker
  }
})
export default class CardView extends Vue {
  @InjectReactive() card !: Card;
  @InjectReactive() listId !: number;
  @InjectReactive() labels !: LabelContainer;
  public editingDescription = false;
  public editableDescription = '';
  public selectedDate: Date = new Date();
  public selectedTime = this.selectedDate.getHours() + ':' + ('00' + this.selectedDate.getMinutes()).slice(-2);
  public timeRegex = new RegExp('^([01]?[0-9]|2[0-3]):[0-5][0-9]$');
  public locale = pl;
  public showLabelEditMenu = false;
  public editingLabel = false;
  public creatingLabel = false;
  public editedLabel!: Label;
  public labelColor = '#000000';
  public labelName = '';
  public editingCardTitle = false;
  public editableCardTitle = '';

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
            this.card.labels.push(labelToAdd);
            this.card.labels = this.card.labels.sort((labelFirst, labelSecond) => labelFirst.id - labelSecond.id);
          });
      }
    }
  }

  isLabelApplied (id: number) {
    return this.card.labels.find(label => label.id === id) != null;
  }

  isTimeValid () {
    return this.timeRegex.test(this.selectedTime);
  }

  @Emit('card-update')
  saveDateTime () {
    this.card.dueDate = undefined;
    const dateToApply = this.selectedDate;
    dateToApply.setSeconds(0, 0);
    const timeParts = this.selectedTime.split(':');
    dateToApply.setHours(parseInt(timeParts[0]));
    dateToApply.setMinutes(parseInt(timeParts[1]));
    this.config.params = {
      id: this.card.id,
      deadline: dateToApply.getDate() + '-' + (dateToApply.getMonth() + 1) + '-' + dateToApply.getFullYear() + ' ' + dateToApply.getHours() + ':' + dateToApply.getMinutes()
    };
    axios.put(Environment.restServices + 'deadline', {}, this.config)
      .then(() => {
        this.card.dueDate = dateToApply;
      });
  }

  @Emit('card-update')
  deleteDateTime () {
    this.config.params = {
      id: this.card.id
    };
    axios.delete(Environment.restServices + 'deadline', this.config)
      .then(() => {
        this.card.dueDate = undefined;
      });
  }

  formatDueDateString (dateToFormat: Date) {
    const localeString = dateToFormat.toLocaleString('pl-PL', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const dateParts = localeString.split(' ');
    return dateParts[0] + ' ' + dateParts[1] + (new Date().getFullYear() !== dateToFormat.getFullYear() ? ' ' + dateToFormat.getFullYear() : '') + ' o ' + dateParts[3];
  }

  getDueDateLabelColor () {
    if (this.card.dueDate != null) {
      let color = DueDateLabelColor.None;
      const currentDate = new Date();
      currentDate.setSeconds(0, 0);
      const dateWarning = new Date(this.card.dueDate);
      dateWarning.setDate(dateWarning.getDate() - 2);
      if (this.card.dueDateComplete) {
        color = DueDateLabelColor.Complete;
      } else if (currentDate > this.card.dueDate) {
        color = DueDateLabelColor.Overdue;
      } else if (currentDate > dateWarning) {
        color = DueDateLabelColor.Soon;
      }
      return color;
    }
  }

  getDueDateLabel () {
    if (this.card.dueDate != null) {
      let label: DueDateLabel = DueDateLabel.None;
      const currentDate = new Date();
      currentDate.setSeconds(0, 0);
      const dateWarning = new Date(this.card.dueDate);
      dateWarning.setDate(dateWarning.getDate() - 2);
      if (this.card.dueDateComplete) {
        label = DueDateLabel.Complete;
      } else if (currentDate > this.card.dueDate) {
        label = DueDateLabel.Overdue;
      } else if (currentDate > dateWarning) {
        label = DueDateLabel.Soon;
      }
      return label;
    }
  }

  openCreateLabelMenu () {
    this.editingLabel = false;
    this.creatingLabel = true;
    this.showLabelEditMenu = true;
  }

  openEditLabelMenu (labelToEdit: Label) {
    this.editedLabel = labelToEdit;
    this.editingLabel = true;
    this.creatingLabel = false;
    this.showLabelEditMenu = true;
  }

  closeCreateLabelMenu (save: boolean) {
    if (save) {
      const newLabel: Label = {
        id: 666,
        name: this.labelName,
        color: this.labelColor
      };
      this.$emit('create-label', newLabel);
    }
    this.showLabelEditMenu = false;
    this.creatingLabel = false;
  }

  closeEditLabelMenu (save: boolean) {
    if (save) {
      const editedLabel: Label = {
        id: 666,
        name: this.labelName,
        color: this.labelColor
      };
      this.$emit('edit-label', editedLabel);
    } else {
      this.$emit('delete-label', this.editedLabel);
    }
    this.showLabelEditMenu = false;
    this.creatingLabel = false;
  }

  startCardTitleEditing () {
    this.editingCardTitle = true;
    this.editableCardTitle = this.card.title;
  }

  endCardTitleEditing () {
    this.editingCardTitle = false;
    this.card.title = this.editableCardTitle;
  }
}
