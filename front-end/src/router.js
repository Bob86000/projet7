import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const router = new Router({
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
      path: "/topic/modify/:id",
      name: "modifyTopic",
      component: () => import("./components/ModifyTopic")
    },
    {
      path: "/comment/:id",
      name: "oneComment",
      component: () => import("./components/Comment")
    },
    {
      path: "/comment/modify/:id",
      name: "modifyComment",
      component: () => import("./components/ModifyComment")
    },
    {
      path: "/addtopic",
      name: "addTopic",
      component: () => import("./components/AddTopic")
    },
    {
      path: "/addcomment/:topicId",
      name: "addComment",
      component: () => import("./components/AddComment")
    },
    {
      path: "*",
      redirect: '/'
    }

  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('session');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
