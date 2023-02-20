/** @format */

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomeView.vue";
import AddPost from "../views/AddPost.vue";
import About from "../views/AboutView.vue";
import PostView from "../views/PostView.vue";
import EditPost from "../views/EditPost.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/add-post",
    name: "add-post",
    component: AddPost,
  },
  {
    path: "/post/:id",
    name: "post",
    component: PostView,
  },
  {
    path: "/edit-post/:id",
    name: "edit-post",
    component: EditPost,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
