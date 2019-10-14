// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import { cloneDeep } from "lodash";
import { moment } from "moment";
import locale from "element-ui/lib/locale/lang/zh-CN";
import "element-ui/lib/theme-chalk/index.css";
import "tui-editor/dist/tui-editor.css"; // editor's ui
import "tui-editor/dist/tui-editor-contents.css"; // editor's content
import "codemirror/lib/codemirror.css"; // codemirror
import "highlight.js/styles/github.css"; // code block highlight
import store from "./store";
import router from "./router";
import App from "./App";
import BaseList from "@/components/BaseList";
import BaseTable from "@/components/BaseTable";
import DetailItem from "@/components/DetailItem";
import DoubleList from "@/components/DoubleList";
import SearchForm from "@/components/SearchForm";

const { MessageBox } = ElementUI;

Vue.component("BaseList", BaseList);
Vue.component("BaseTable", BaseTable);
Vue.component("DetailItem", DetailItem);
Vue.component("DoubleList", DoubleList);
Vue.component("SearchForm", SearchForm);
Vue.prototype.$copy = obj => cloneDeep(obj);
Vue.prototype.$apiConfirm = (msg, api) =>
  new Promise(resolve => {
    MessageBox.confirm(msg || "此操作将永久删除该行, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      beforeClose: (action, instance, done) => {
        if (action === "confirm") {
          instance.confirmButtonLoading = true;
          api().then(res => {
            setTimeout(() => {
              instance.confirmButtonLoading = false;
            }, 300);
            done();
            resolve(res);
          });
        } else {
          done();
        }
      }
    })
      .then(() => {})
      .catch(() => {
        resolve(null);
      });
  });

Vue.filter("date", function(value, format) {
  if (!value) return "";
  return moment(value).format(format || "YYYY-MM-DD HH:mm:ss");
});

Vue.use(ElementUI, { locale, size: "mini" });
Vue.use(VueRouter);

Vue.config.productionTip = false;

// 全局路由钩子
router.beforeEach(async (to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
