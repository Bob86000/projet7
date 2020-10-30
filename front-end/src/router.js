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
      path: "/topics",
      name: "topics",
      component: () => import("./components/TutorialsList")
    },
    {
      path: "/topic/:id",
      name: "oneTopic",
      component: () => import("./components/Tutorial")
    },
    {
      path: "/addtopic",
      name: "addTopic",
      component: () => import("./components/AddTutorial")
    },
    {
      path: "*",
      redirect: '/'
    }

  ]
});
