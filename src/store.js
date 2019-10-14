import Vue from "vue";
import Vuex from "vuex";
import { tagsList, categoriesList } from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    map: {}
  },
  mutations: {
    setMap(state, val) {
      state.map = { ...state.map, ...val };
    }
  },
  actions: {
    initMap(context, key) {
      if (key === undefined || key === "tags")
        tagsList({ pageSize: 999 }).then(res => {
          if (!res) return;
          context.commit("setMap", {
            tags: res.list.map(v => ({
              key: v.name,
              value: v._id
            }))
          });
        });
      if (key === undefined || key === "categories")
        categoriesList({ pageSize: 999 }).then(res => {
          if (!res) return;
          context.commit("setMap", {
            categories: res.list.map(v => ({
              key: v.name,
              value: v._id
            }))
          });
        });
    }
  }
});
