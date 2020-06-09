import Vue from 'vue'
import VueRouter from "vue-router";
import VueSimpleAlert from "vue-simple-alert";
import Vuex from 'vuex'
import App from './App.vue'

import ChecklistChoice from './components/ChecklistChoice'
import ChecklistCreate from './components/ChecklistCreate'
import ChecklistView from './components/ChecklistView'
import ChecklistMyChecklists from "@/components/ChecklistMyChecklists";

import clickoutisde from './diretivas/click-outside'
import tokenStore from './stores/tokenStore'


const routes = [
  {path:'/',alias:'/choose',name:'Choice',component:ChecklistChoice},
  {path:'/mychecklists',name:'MyChecklists',component:ChecklistMyChecklists},
  {path:'/create/:checklist',name:'Create',component:ChecklistCreate,props:true},
  {path:'/create/',name:'Create',component:ChecklistCreate},
  {path:'/view/:checklist',name:'View',component:ChecklistView,props:true}
]
const router = new VueRouter({
  base:'/revisionhub',
  routes,
  mode:'history'})

Vue.use(VueRouter)
Vue.use(VueSimpleAlert)
Vue.use(Vuex)
Vue.directive('click-outside', clickoutisde)



const store = new Vuex.Store({
  modules: {
    'tokenStore':tokenStore
  }
});


new Vue({
  router,
  render: h => h(App),
  store,
}).$mount('#app')
