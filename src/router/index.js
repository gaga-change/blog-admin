import Vue from "vue";
import Router from "vue-router";
import AdminHome from "@/pages/AdminHome";
import UserLogin from "@/pages/UserLogin";
import PostCreate from "@/pages/post/PostCreate";
import WebSet from "@/pages/content/WebSet";
import TagList from "@/pages/tag/TagList";
import PostList from "@/pages/post/PostList";
import CategoryList from "@/pages/category/CategoryList";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: "",
  routes: [
    {
      path: "/",
      component: AdminHome,
      redirect: "PostCreate",
      children: [
        {
          path: "PostCreate",
          name: "PostCreate",
          component: PostCreate,
          meta: {
            title: "发布笔记"
          }
        },
        {
          path: "PostList",
          name: "PostList",
          component: PostList,
          meta: {
            title: "笔记管理"
          }
        },
        {
          path: "CategoryList",
          name: "CategoryList",
          component: CategoryList,
          meta: {
            title: "分类管理"
          }
        },
        {
          path: "TagList",
          name: "TagList",
          component: TagList,
          meta: {
            title: "标签管理"
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
