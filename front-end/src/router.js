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
    path: "/home",
    name: "home",
      component: () => import("./components/Home")
    },
    {
      path: "/topics",
      name: "topics",
      component: () => import("./components/TutorialsList"),
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
      redirect: '/signup'
    }

  ]
});
