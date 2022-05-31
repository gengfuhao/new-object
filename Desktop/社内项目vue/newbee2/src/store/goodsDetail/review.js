//该页面为商品详细页面的数据处理页面

const url =
  "http://localhost:3000/goods/detail/review/goodsId/:goodsId/offset/:offset";
const headers = { Accept: "application/json" };

export default {
  state: {
    reviews: { reviewList: [] },
    reviews2: { reviewList: [] },
    reviewAll: [],
    showed: true,
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
    changeShowed(state, payload) {
      state.showed = payload;
      console.log("array push showed ", state.showed);
    },

    filterReviews(state, rating) {
      if (state.reviewAll.length === 0) {
        // state.reviewAll = [
        //   ...state.reviews.reviewList,
        //   ...state.reviews2.reviewList,
        // ];
        state.reviewAll.push(...state.reviews.reviewList);
        state.reviewAll.push(...state.reviews2.reviewList);
        // console.log("review.js中的filterReviews的值为", state.reviewAll);
      }
      const arr = state.reviewAll.filter((review) => rating == review.rating);
      state.reviews.reviewCount = arr.length;
      state.reviews.reviewList = arr.slice(0, 3);
      state.reviews2.reviewList = [];
      if (arr.length > 3) {
        state.reviews2.reviewList = arr.slice(3);
      }
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
      console.log("in getReviews2 method", state.reviews);

      return state.reviews2;
    },
    getShowd: (state) => {
      console.log("in getShowed method", state.showed);

      return state.showed;
    },
    // getReviewCount: (state) => {
    //   console.log("in reviewCount method", state.reviewCount);

    //   return state.reviewCount;
    // },
  },
};
