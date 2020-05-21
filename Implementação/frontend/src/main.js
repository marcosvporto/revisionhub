import Vue from 'vue'
import VueRouter from "vue-router";
import App from './App.vue'
import ChecklistChoice from './components/ChecklistChoice'
import ChecklistCreate from './components/ChecklistCreate'
import Login from './components/Login'

const routes = [
  {path:'/list',component:ChecklistChoice},
  {path:'/create',component:ChecklistCreate},
  {path:'/login',component:Login}
]


const router = new VueRouter({routes,mode:'history'})

Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
