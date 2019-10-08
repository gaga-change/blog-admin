import Vue from "vue";
import Router from "vue-router";
import AdminHome from "@/pages/AdminHome";
import UserLogin from "@/pages/UserLogin";
import PostCreate from "@/pages/content/PostCreate";
import PostList from "@/pages/content/PostList";
import WebSet from "@/pages/content/WebSet";
import TagList from "@/pages/tag/TagList";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: "",
  routes: [
    {
      path: "/",
      component: AdminHome,
      children: [
        {
          path: "",
          name: "PostCreate",
          component: PostCreate,
          meta: {
            title: "发布笔记"
          }
        },
        {
          path: "TagList",
          name: "TagList",
          component: TagList,
          meta: {
            title: "标签列表"
          }
        },
        {
          path: "post_list",
          name: "PostList",
          component: PostList,
          meta: {
            title: "笔记列表"
          }
        },
        {
          path: "web_set",
          name: "WebSet",
          component: WebSet,
          meta: {
            title: "站点设置"
          }
        }
      ]
    },
    {
      path: "/login",
      name: "UserLogin",
      component: UserLogin,
      meta: {
        title: "登入"
      }
    },
    { path: "*", redirect: "/" }
  ]
});
