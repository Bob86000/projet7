import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "user",
        component: () => import("./components/User")
    },
    {
    path: "/home",
    name: "home",
      component: () => import("./components/Home")
    },
    {
      path: "/bestTopic",
      name: "bestTopic",
        component: () => import("./components/BestTopic")
      },
    {
      path: "/topic/:id",
      name: "oneTopic",
      component: () => import("./components/Topic")
    },
    {
      path: "/comment/:id",
      name: "oneComment",
      component: () => import("./components/Comment")
    },
    {
      path: "/addtopic",
      name: "addTopic",
      component: () => import("./components/AddTopic")
    },
    {
      path: "*",
      redirect: '/'
    }

  ]
});
