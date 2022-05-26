const url =
  "http://localhost:3000/goods/detail/review/goodsId/:goodsId/offset/:offset";
const headers = { Accept: "application/json" };

export default {
  state: {
    reviews: [],
    reviews2: [],
  },
  mutations: {
    setReviews(state, payload) {
      state.reviews = payload[0];
      console.log("array push review ", payload);
    },
    setReviews2(state, payload) {
      state.reviews2 = payload[0];
      console.log("array push review2 ", payload);
    },
  },
  actions: {
    async setReviews(context, payload) {
      const { goodsId, offset } = payload;
      const newUrl = url
        .replace(":goodsId", goodsId)
        .replace(":offset", offset);
      const goodses = await fetch(newUrl, { headers });
      const j = await goodses.json();

      if (offset === 0) {
        context.commit("setReviews", j);
        console.log("actions  00000000000review的j内容为", j);
      } else {
        context.commit("setReviews2", j);
        console.log("actions  3333333review的j内容为", j);
      }
    },
  },
  getters: {
    getReviews: (state) => {
      console.log("in getReviews method", state.reviews);

      return state.reviews;
    },
    getReviews2: (state) => {
      console.log("in getReviews method", state.reviews);

      return state.reviews2;
    },
  },
};
