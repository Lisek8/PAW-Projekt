import { Card } from '@/dataStructures/card';
import { Options, Vue } from 'vue-class-component';
import { Emit, InjectReactive } from 'vue-property-decorator';

@Options({
  emits: [
    'update:card',
    'card-update'
  ]
})
export default class CardView extends Vue {
  @InjectReactive() card !: Card;

  @Emit('card-update')
  updateCard () {
    // Communicate with rest api
    // Execute following code only if request was successfull if not display error message
    this.$emit('update:card', this.card);
  }
};
