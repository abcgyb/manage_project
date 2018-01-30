import Vue from "vue";
import App from "./App";
import VueRouter from "vue-router";
import Mock from "./mock/mock";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Table from "./views/table/table.vue";
import "font-awesome/css/font-awesome.min.css";
import VueResource from "../node_modules/vue-resource/dist/vue-resource";
import Manager from "./views/table/manager.vue";
import Login from "./views/login/login.vue";
import Content from "./views/content/content.vue";
import JustShow from "./views/test/justShowPage.vue";

Vue.config.productionTip = false
Mock.mockData();
Vue.use(VueRouter);
Vue.use(ElementUI)
Vue.use(VueResource)

let routes = [
  {path:'/', component:Login},
  {path: '/main', component: Content,
    children:[
      {path: '/table', component: Table},
      {path: '/manager', component: Manager},
    ]},
  {path:'/testShow', component:JustShow},
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
