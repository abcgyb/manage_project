// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import axios from 'axios';
import Mock from './mock/mock';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Table from './views/table/table.vue'
import 'font-awesome/css/font-awesome.min.css';
import VueResource from '../node_modules/vue-resource/dist/vue-resource'
import Test from './views/table/test11.vue'

Vue.config.productionTip = false
Mock.mockData();
Vue.use(VueRouter);
Vue.use(ElementUI)
Vue.use(VueResource)
//Vue.prototype.$http = axios;

let routes = [
  {
    path: '/table',
    component: Table
  },
  {
    path: '/test',
    component: Test
  }
];
let router = new VueRouter({
  'linkActiveClass': 'active',
  routes
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
