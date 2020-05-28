import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import ChecklistChoice from './components/ChecklistChoice'
import ChecklistCreate from './components/ChecklistCreate'
import ChecklistView from './components/ChecklistView'
import Login from './components/Login'
import clickoutisde from './diretivas/click-outside'

const routes = [
  {path:'/',alias:'/choose',name:'Choice',component:ChecklistChoice},
  {path:'/create',name:'Create',component:ChecklistCreate},
  {path:'/login',name:'Login',component:Login},
  {path:'/view/:checklistId',name:'View',component:ChecklistView,props:true}
]


const router = new VueRouter({routes,mode:'history'})

Vue.use(VueRouter)
Vue.directive('click-outside', clickoutisde)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
