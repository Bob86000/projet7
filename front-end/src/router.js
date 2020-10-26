import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/signup",
      name: "signUp",
      component: () => import("./components/Signup")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./components/Login")
    },
    {
      path: "/topic",
      alias: "/tutorials",
      name: "allTutorials",
      component: () => import("./components/TutorialsList")
    },
    {
      path: "/topics/:id",
      name: "oneTutorial",
      component: () => import("./components/Tutorial")
    },
    {
      path: "/addtopic",
      name: "addTopic",
      component: () => import("./components/AddTutorial")
    },
    {
      path: "*",
      redirect: '/signup'
    }

  ]
});
