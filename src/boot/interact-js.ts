import { boot } from 'quasar/wrappers';
import interact from 'interactjs'

export default boot(({ app }) => {
  app.config.globalProperties.$interact = interact;
});
