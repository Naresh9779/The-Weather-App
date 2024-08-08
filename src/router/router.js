import { createRouter,createWebHistory } from "vue-router";

import Home from "../views/home.vue";
import cityView from "../views/cityView.vue";

const routes =[
    {
        path: '/',
        name: 'home',
        component: Home,
        meta:{
            title:"Home"
        }
    },
    {
        path:'/cityView/:state/:city',
        name: 'cityView',
        component:cityView,
        meta:{
            title:"Weather"
        }
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes,




})

router.beforeEach((to, from, next) => {
    document.title = `${to.params.state? `${to.params.city} , ${to.params.state}`: to.meta.title} | The Local Weather`;
    next();
})
export default router;