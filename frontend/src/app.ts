import { Options, Vue } from 'vue-class-component';
import Content from './components/content/Content.vue';
import Menu from './components/menu/Menu.vue';
import Login from './components/login/Login.vue';

@Options({
  components: {
    Content,
    Menu,
    Login
  }
})
export default class App extends Vue {
  public matchesBoardPage () {
    return this.$route.path.match('/board/.*') != null;
  }
};
