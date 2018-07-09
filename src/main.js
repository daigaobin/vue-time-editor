import Vue from 'vue'
import App from './App.vue'
import TimeEditor from 'vue-time-editor';
Vue.use(TimeEditor);


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

